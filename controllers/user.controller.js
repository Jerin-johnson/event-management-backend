import { HTTP_STATUS } from "../constants/http.constants.js";
import { SUCCESS_MESSAGES } from "../constants/success.constants.js";
import * as userService from "../services/user.services.js";
import { successResponse } from "../utils/api.response.js";
import asyncHandler from "express-async-handler";

export const createUserProfile = asyncHandler(async (req, res) => {
    const profile = await userService.createUserProfile(req.body);
    return successResponse(res, profile, SUCCESS_MESSAGES.PROFILE_CREATED, HTTP_STATUS.CREATED);
});

export const getUserProfiles = asyncHandler(async (req, res) => {
    const { search = "", cursor, limit } = req.query;
    const result = await userService.getUserProfiles(search, cursor, limit);
    console.log("the profile fetched successfully");
    return successResponse(res, result, SUCCESS_MESSAGES.PROFILES_FETCHED, HTTP_STATUS.OK);
});
