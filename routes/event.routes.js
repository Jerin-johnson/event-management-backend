import express from "express";
import {
    createEvent,
    getEventLogs,
    getUserEvents,
    updateEvent,
} from "../controllers/event.controller.js";
import {
    validateCreateEvent,
    validateGetEventUserId,
    validateUpdateEvent,
} from "../middlewares/validations/event.validation.js";

const eventRouter = express.Router();

eventRouter.post("/", validateCreateEvent, createEvent);
eventRouter.get("/user/:userId", validateGetEventUserId, getUserEvents);
eventRouter.patch("/:eventId", validateUpdateEvent, updateEvent);
eventRouter.get("/:eventId/logs", getEventLogs);

export default eventRouter;
