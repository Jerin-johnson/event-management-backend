import * as userRepository from "../repositories/user.repositories.js";
import * as eventRepository from "../repositories/event.repositories.js";
import * as eventLogRepository from "../repositories/eventLog.repositories.js";
import ApiError from "../utils/api.error.js";
import { HTTP_STATUS } from "../constants/http.constants.js";
import { ERROR_MESSAGES } from "../constants/error.constants.js";
import dayjs from "dayjs";
import utc from "dayjs/plugin/utc.js";
import timezonePlugin from "dayjs/plugin/timezone.js";
import logger from "../utils/logger.js";
import { normalize } from "../utils/normalize .js";

dayjs.extend(utc);
dayjs.extend(timezonePlugin);

export const createEvent = async (data) => {
    const { profiles, timezone, startDateTime, endDateTime, createdBy } = data;

    const existingUsers = await userRepository.getUsersByIds(profiles);

    if (existingUsers.length !== profiles.length) {
        throw new ApiError(HTTP_STATUS.BAD_REQUEST, ERROR_MESSAGES.PROFILE_LENGTH_INVALID);
    }

    const start = dayjs.tz(startDateTime, timezone);
    const end = dayjs.tz(endDateTime, timezone);

    if (!start.isValid() || !end.isValid()) {
        throw new ApiError(HTTP_STATUS.BAD_REQUEST, ERROR_MESSAGES.INVALID_DATE);
    }

    if (end.isBefore(start)) {
        throw new ApiError(HTTP_STATUS.BAD_REQUEST, ERROR_MESSAGES.END_BEFORE_START);
    }

    const eventData = {
        profiles,
        timezone,
        startDateTime: start.utc().toDate(),
        endDateTime: end.utc().toDate(),
        createdBy,
    };

    const event = await eventRepository.createEvent(eventData);

    return event;
};

export const getEventsForUser = async (userId) => {
    const user = await userRepository.getUserById(userId);

    if (!user) {
        throw new ApiError(HTTP_STATUS.NOT_FOUND, "User not found");
    }

    const events = await eventRepository.getEventsByProfile(userId);

    return events;
};

export const updateEvent = async (eventId, updateData, changedBy) => {
    const event = await eventRepository.findEventById(eventId);
    if (!event) {
        throw new ApiError(HTTP_STATUS.NOT_FOUND, ERROR_MESSAGES.EVENT_NOT_FOUND);
    }

    const isParticipant = event.profiles.some((p) => p._id.toString() === changedBy.toString());
    if (!isParticipant) {
        throw new ApiError(HTTP_STATUS.FORBIDDEN, ERROR_MESSAGES.PART_OF_EVENT_ONLY_UPDATE);
    }

    const previousValues = {
        timezone: event.timezone,
        startDateTime: event.startDateTime,
        endDateTime: event.endDateTime,
        profiles: event.profiles.map((p) => ({
            _id: p._id,
            name: p.name,
        })),
    };

    const newUpdateData = { ...updateData };

    if (updateData.startDateTime) {
        newUpdateData.startDateTime = dayjs
            .tz(updateData.startDateTime, updateData.timezone || event.timezone)
            .utc()
            .toDate();
    }
    if (updateData.endDateTime) {
        newUpdateData.endDateTime = dayjs
            .tz(updateData.endDateTime, updateData.timezone || event.timezone)
            .utc()
            .toDate();
    }

    const previousNormalized = normalize(previousValues);
    const currentNormalized = normalize(newUpdateData);

    console.log("the previos", previousNormalized);
    console.log("the current", currentNormalized);

    const changedFields = [];

    for (const key of Object.keys(currentNormalized)) {
        if (JSON.stringify(previousNormalized[key]) !== JSON.stringify(currentNormalized[key])) {
            changedFields.push(key);
        }
    }

    if (changedFields.length === 0) {
        return event;
    }

    const logValues = { ...newUpdateData };

    delete logValues.changedBy;

    if (changedFields.includes("profiles")) {
        const getProfilesOfUpdatedUser = await userRepository.getUsersByIds(updateData.profiles);
        const formatAddedUser = getProfilesOfUpdatedUser.map((p) => ({
            _id: p._id,
            name: p.name,
        }));

        logValues.profiles = formatAddedUser;
    }

    const updatedEvent = await eventRepository.updateEvent(eventId, newUpdateData);

    await eventLogRepository.createLog({
        event: eventId,
        changedBy,
        previousValues,
        newValues: logValues,
        changedFields,
    });

    return updatedEvent;
};

export const getEventLogs = async (eventId) => {
    return await eventLogRepository.getLogsByEvent(eventId);
};
