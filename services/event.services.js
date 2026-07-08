import * as userRepository from "../repositories/user.repositories.js";
import * as eventRepository from "../repositories/event.repositories.js";
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

    if (existingUsers.length !== (profiles || []).length) {
        throw new ApiError(HTTP_STATUS.BAD_REQUEST, ERROR_MESSAGES.PROFILE_LENGTH_INVALID);
    }

    const start = dayjs.tz(startDateTime, timezone);
    const end = dayjs.tz(endDateTime, timezone);

    if (!start.isValid() || !end.isValid()) {
        throw new ApiError(HTTP_STATUS.BAD_REQUEST, ERROR_MESSAGES.INVALID_TIMEZONE);
    }

    if (end.isBefore(start)) {
        throw new ApiError(HTTP_STATUS.BAD_REQUEST, ERROR_MESSAGES.END_BEFORE_START);
    }

    const eventData = {
        title: data.title?.trim(),
        profiles,
        timezone,
        startDateTime: start.utc().toDate(),
        endDateTime: end.utc().toDate(),
        createdBy,
    };

    const event = await eventRepository.createEvent(eventData);

    return event;
};
