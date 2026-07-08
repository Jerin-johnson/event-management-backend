import { MESSAGE } from "../constants/message.constants.js";
import { successResponse } from "../utils/api.response.js";

export const checkHealthContoller = (req, res) => {
    let response = {
        success: true,
        message: MESSAGE.HEALTH_CHECK,
        timestamp: new Date().toISOString(),
    };

    return successResponse(res, response, response.message);
};
