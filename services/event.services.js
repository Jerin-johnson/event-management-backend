import * as userRepository from "../repositories/user.repositories.js";
import * as eventRepository from "../repositories/event.repositories.js";
import * as eventLogRepository from "../repositories/eventLog.repositories.js";
import ApiError from "../utils/api.error.js";
import { HTTP_STATUS } from "../constants/http.constants.js";
import { ERROR_MESSAGES } from "../constants/error.constants.js";
import dayjs from "dayjs";
import utc from "dayjs/plugin/utc.js";
import timezonePlugin from "dayjs/plugin/timezone.js";

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

    // allevent times to user's timezone
    const eventsInUserTz = events.map((event) => {
        const startInUserTz = dayjs(event.startDateTime).tz(user.timezone);
        const endInUserTz = dayjs(event.endDateTime).tz(user.timezone);

        return {
            ...event.toObject(),
            startDateTime: startInUserTz.format("YYYY-MM-DD HH:mm:ss"),
            endDateTime: endInUserTz.format("YYYY-MM-DD HH:mm:ss"),
            createdAt: dayjs(event.createdAt).tz(user.timezone).format(),
            updatedAt: dayjs(event.updatedAt).tz(user.timezone).format(),
        };
    });

    console.log(eventsInUserTz);

    return eventsInUserTz;
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
        profiles: event.profiles.map((p) => p._id),
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

    const updatedEvent = await eventRepository.updateEvent(eventId, newUpdateData);

    const changedFields = Object.keys(updateData);

    await eventLogRepository.createLog({
        event: eventId,
        changedBy,
        previousValues,
        newValues: updateData,
        changedFields,
    });

    return updatedEvent;
};

export const getEventLogs = async (eventId) => {
    return await eventLogRepository.getLogsByEvent(eventId);
};
