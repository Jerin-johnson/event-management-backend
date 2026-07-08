import { COMMON_TIMEZONES } from "../../constants/control.constants";
import { ERROR_MESSAGES } from "../../constants/error.constants";
import { HTTP_STATUS } from "../../constants/http.constants";
import ApiError from "../../utils/api.error";
import { errorResponse } from "../../utils/api.response";
import mongoose from "mongoose";

export const validateGetEventUserId = (req, res, next) => {
    const id = req.params.userId;

    if (!mongoose.Types.ObjectId.isValid(id)) {
        throw new ApiError(HTTP_STATUS.BAD_REQUEST, ERROR_MESSAGES.INVALID_USER_ID);
    }

    next();
};

export const validateCreateEvent = (req, res, next) => {
    const { title, profiles, timezone, startDateTime, endDateTime, createdBy } = req.body;

    if (!title || typeof title !== "string" || title.trim().length < 3) {
        return errorResponse(res, ERROR_MESSAGES.EVENT_TITLE_LENGTH, HTTP_STATUS.BAD_REQUEST);
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

    req.body.title = title.trim();
    req.body.createdBy = createdBy;

    next();
};
