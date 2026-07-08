import asyncHandler from "express-async-handler";
import * as eventService from "../services/event.services.js";
import { successResponse } from "../utils/api.response.js";
import { SUCCESS_MESSAGES } from "../constants/success.constants.js";
import { HTTP_STATUS } from "../constants/http.constants.js";

export const getUserEvents = asyncHandler(async (req, res) => {
    const { userId } = req.params;
    const events = await eventService.getEventsForUser(userId);
    successResponse(res, events, SUCCESS_MESSAGES.EVENT_FETCHED);
});

export const createEvent = asyncHandler(async (req, res) => {
    const event = await eventService.createEvent(req.body);
    successResponse(res, event, "Event created successfully", HTTP_STATUS.CREATED);
});
