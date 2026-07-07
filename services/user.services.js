import * as userRepository from "../repositories/user.repositories.js";
import ApiError from "../utils/api.error.js";
import { HTTP_STATUS } from "../constants/http.constants.js";
import { PAGINATION } from "../constants/control.constants.js";
import { ERROR_MESSAGES } from "../constants/error.constants.js";

export const createUserProfile = async (data) => {
    const existingProfile = await userRepository.findProfileByName(data.name);

    console.log(existingProfile);

    if (existingProfile) {
        throw new ApiError(HTTP_STATUS.CONFLICT, ERROR_MESSAGES.PROFILE_ALREADY_EXISTS);
    }

    const profile = await userRepository.createProfile(data);
    console.log("the profile");
    return profile;
};

export const getUserProfiles = async (
    search = "",
    cursor = null,
    limit = PAGINATION.DEFAULT_LIMIT
) => {
    //valdiation in limit ensure valdi limit
    const finalLimit = Math.min(Math.max(1, parseInt(limit)), PAGINATION.MAX_LIMIT);

    const profiles = await userRepository.getProfiles(search, cursor, finalLimit);

    return {
        profiles,
        pagination: {
            limit: finalLimit,
            hasMore: profiles.length === finalLimit,
            nextCursor: profiles.length > 0 ? profiles[profiles.length - 1]._id : null,
        },
    };
};
