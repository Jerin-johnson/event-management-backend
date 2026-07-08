import { successResponse } from "../utils/api.response.js";
import { COMMON_TIMEZONES } from "../constants/control.constants.js";
import { SUCCESS_MESSAGES } from "../constants/success.constants.js";

export const getTimezones = async (req, res) => {
    return successResponse(res, COMMON_TIMEZONES, SUCCESS_MESSAGES.TIME_ZONE_FETCHED);
};
