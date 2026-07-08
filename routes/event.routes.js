import express from "express";
import { createEvent, getUserEvents } from "../controllers/event.controller.js";
import {
    validateCreateEvent,
    validateGetEventUserId,
} from "../middlewares/validations/event.validation.js";

const eventRouter = express.Router();

eventRouter.post("/", validateCreateEvent, createEvent);
eventRouter.get("/user/:userId", validateGetEventUserId, getUserEvents);

export default eventRouter;
