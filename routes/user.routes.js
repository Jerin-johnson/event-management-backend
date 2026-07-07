import express from "express";
import { createUserProfile, getUserProfiles } from "../controllers/user.controller.js";
import { validateCreateUserProfile } from "../middlewares/validations/user.validation.js";

const userRouter = express.Router();

userRouter.get("/users", getUserProfiles);
userRouter.post("/users", validateCreateUserProfile, createUserProfile);

export default userRouter;
