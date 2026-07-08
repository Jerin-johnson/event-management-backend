import { COMMON_TIMEZONES } from "../../constants/control.constants.js";
import { ERROR_MESSAGES } from "../../constants/error.constants.js";
import { HTTP_STATUS } from "../../constants/http.constants.js";
import ApiError from "../../utils/api.error.js";
import { errorResponse } from "../../utils/api.response.js";
import mongoose from "mongoose";

export const validateGetEventUserId = (req, res, next) => {
    const id = req.params.userId;

    if (!mongoose.Types.ObjectId.isValid(id)) {
        throw new ApiError(HTTP_STATUS.BAD_REQUEST, ERROR_MESSAGES.INVALID_USER_ID);
    }

    next();
};

export const validateCreateEvent = (req, res, next) => {
    const { profiles, timezone, startDateTime, endDateTime, createdBy } = req.body;

    if (!createdBy) {
        return errorResponse(res, ERROR_MESSAGES.CREATEDBY_MISSING, HTTP_STATUS.BAD_REQUEST);
    }

    if (!profiles || !Array.isArray(profiles) || profiles.length === 0) {
        return errorResponse(res, ERROR_MESSAGES.PROFILE_LENGTH_INVALID, HTTP_STATUS.BAD_REQUEST);
    }

    if (!timezone || typeof timezone !== "string") {
        return errorResponse(res, ERROR_MESSAGES.INVALID_TIMEZONE, HTTP_STATUS.BAD_REQUEST);
    }

    const validTimezones = [...COMMON_TIMEZONES, ...Intl.supportedValuesOf("timeZone")];

    if (!validTimezones.includes(timezone)) {
        return errorResponse(res, ERROR_MESSAGES.INVALID_TIMEZONE, HTTP_STATUS.BAD_REQUEST);
    }

    if (!startDateTime || !endDateTime) {
        return errorResponse(res, ERROR_MESSAGES.START_END_TIME_REQUIRED, HTTP_STATUS.BAD_REQUEST);
    }

    const start = new Date(startDateTime);
    const end = new Date(endDateTime);

    if (isNaN(start.getTime()) || isNaN(end.getTime())) {
        return errorResponse(res, ERROR_MESSAGES.INVALID_DATE, HTTP_STATUS.BAD_REQUEST);
    }

    if (end <= start) {
        return errorResponse(res, ERROR_MESSAGES.END_BEFORE_START, HTTP_STATUS.BAD_REQUEST);
    }

    next();
};

export const validateUpdateEvent = (req, res, next) => {
    const { timezone, startDateTime, endDateTime, profiles, changedBy } = req.body;

    if (!changedBy) {
        return errorResponse(res, ERROR_MESSAGES.CHANGEDBY_MISSING, HTTP_STATUS.BAD_REQUEST);
    }

    if (timezone) {
        const validTimezones = [...COMMON_TIMEZONES, ...Intl.supportedValuesOf("timeZone")];
        if (typeof timezone !== "string" || !validTimezones.includes(timezone)) {
            return errorResponse(res, ERROR_MESSAGES.INVALID_TIMEZONE, HTTP_STATUS.BAD_REQUEST);
        }
    }

    if (profiles !== undefined) {
        if (!Array.isArray(profiles) || profiles.length === 0) {
            return errorResponse(
                res,
                ERROR_MESSAGES.PROFILE_LENGTH_INVALID,
                HTTP_STATUS.BAD_REQUEST
            );
        }
    }

    if (startDateTime && endDateTime) {
        const start = new Date(startDateTime);
        const end = new Date(endDateTime);

        if (isNaN(start.getTime()) || isNaN(end.getTime())) {
            return errorResponse(res, ERROR_MESSAGES.INVALID_DATE, HTTP_STATUS.BAD_REQUEST);
        }

        if (end <= start) {
            return errorResponse(res, ERROR_MESSAGES.END_BEFORE_START, HTTP_STATUS.BAD_REQUEST);
        }
    }

    next();
};
