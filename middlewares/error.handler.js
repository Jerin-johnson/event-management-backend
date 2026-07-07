import { ERROR_MESSAGES } from "../constants/error.constants.js";
import { HTTP_STATUS } from "../constants/http.constants.js";
import ApiError from "../utils/api.error.js";
import { errorResponse } from "../utils/api.response.js";
import logger from "../utils/logger.js";

const errorHandler = (err, req, res, next) => {
    logger.warn(err.message, err);
    if (err instanceof ApiError) {
        return errorResponse(res, err.message, err.statusCode);
    }

    return errorResponse(
        res,
        err.message || ERROR_MESSAGES.SERVER_ERROR,
        HTTP_STATUS.INTERNAL_SERVER_ERROR
    );
};

export default errorHandler;
