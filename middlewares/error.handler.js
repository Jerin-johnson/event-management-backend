import ApiError from "../utils/api.error";
import { errorResponse } from "../utils/api.response";

const errorHandler = (err, req, res) => {
    console.error(err);

    if (err instanceof ApiError) {
        return errorResponse(res, err.message, err.statusCode);
    }

    return errorResponse(res, "Internal Server Error", 500);
};

export default errorHandler;
