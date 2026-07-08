import express from "express";
import { getTimezones } from "../controllers/timezone.controller.js";

const timeZoneRouter = express.Router();

timeZoneRouter.get("/", getTimezones);

export default timeZoneRouter;
