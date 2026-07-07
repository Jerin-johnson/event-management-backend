import { ERROR_MESSAGES } from "../../constants/error.constants.js";
import { HTTP_STATUS } from "../../constants/http.constants.js";
import { errorResponse } from "../../utils/api.response.js";

export const validateCreateUserProfile = (req, res, next) => {
    const { name, timezone } = req.body;

    if (!name || typeof name !== "string" || name.trim().length < 2) {
        return errorResponse(res, ERROR_MESSAGES.NAME_MUST_ATLEAST_TWO, HTTP_STATUS.BAD_REQUEST);
    }

    if (!timezone || typeof timezone !== "string") {
        return errorResponse(res, ERROR_MESSAGES.INVALID_TIMEZONE, HTTP_STATUS.BAD_REQUEST);
    }

    if (!Intl.supportedValuesOf("timeZone").includes(timezone)) {
        return errorResponse(res, ERROR_MESSAGES.INVALID_TIMEZONE, HTTP_STATUS.BAD_REQUEST);
    }

    req.body.name = name.trim();
    req.body.timezone = timezone.trim();

    next();
};
