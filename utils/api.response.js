import { ERROR_MESSAGES } from "../constants/error.constants.js";
import { HTTP_STATUS } from "../constants/http.constants.js";
import { SUCCESS_MESSAGES } from "../constants/success.constants.js";

const successResponse = (
    res,
    data,
    message = SUCCESS_MESSAGES.SUCCESS,
    statusCode = HTTP_STATUS.OK
) => {
    return res.status(statusCode).json({
        success: true,
        message,
        data,
    });
};

const errorResponse = (
    res,
    message = ERROR_MESSAGES.SERVER_ERROR,
    statusCode = HTTP_STATUS.INTERNAL_SERVER_ERROR,
    errors = null
) => {
    return res.status(statusCode).json({
        success: false,
        message,
        errors: errors || undefined,
    });
};

export { successResponse, errorResponse };
