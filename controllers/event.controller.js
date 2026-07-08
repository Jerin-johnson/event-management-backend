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
    successResponse(res, event, SUCCESS_MESSAGES.EVENT_CREATED, HTTP_STATUS.CREATED);
});

export const updateEvent = asyncHandler(async (req, res) => {
    const { eventId } = req.params;
    const updatedEvent = await eventService.updateEvent(eventId, req.body, req.body.changedBy);
    successResponse(res, updatedEvent, SUCCESS_MESSAGES.EVENT_UPDATED);
});

export const getEventLogs = asyncHandler(async (req, res) => {
    const { eventId } = req.params;
    const logs = await eventService.getEventLogs(eventId);
    successResponse(res, logs, SUCCESS_MESSAGES.EVENT_LOG_FETCHED);
});
