import express from "express";
import { createUserProfile, getUserProfiles } from "../controllers/user.controller.js";
import { validateCreateUserProfile } from "../middlewares/validations/user.validation.js";

const userRouter = express.Router();

userRouter.post("/", validateCreateUserProfile, createUserProfile);
userRouter.get("/", getUserProfiles);

export default userRouter;
