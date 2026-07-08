import express from "express";
import { createUserProfile, getUserProfiles } from "../controllers/user.controller.js";
import { validateCreateUserProfile } from "../middlewares/validations/user.validation.js";

const userRouter = express.Router();

userRouter.get("/", getUserProfiles);
userRouter.post("/", validateCreateUserProfile, createUserProfile);

export default userRouter;
