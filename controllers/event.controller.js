import asyncHandler from "express-async-handler";
import * as eventService from "../services/event.services.js";
import { successResponse } from "../utils/api.response.js";
import { SUCCESS_MESSAGES } from "../constants/success.constants.js";

export const getUserEvents = asyncHandler(async (req, res) => {
    const { userId } = req.params;
    const events = await eventService.getEventsForUser(userId);
    successResponse(res, events, SUCCESS_MESSAGES.EVENT_FETCHED);
});
