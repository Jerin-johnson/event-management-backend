import express from "express";
import { getUserProfiles } from "../controllers/user.controller";

const eventRouter = express.Router();

eventRouter.get("/user/:userI", getUserProfiles);

export default eventRouter;
