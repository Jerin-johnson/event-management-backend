import * as userRepository from "../repositories/user.repositories.js";
import ApiError from "../utils/ApiError.js";
import { HTTP_STATUS, MESSAGES } from "../constants/index.js";
import { PAGINATION } from "../constants/control.constants.js";

export const createUserProfile = async (data) => {
    const existingProfile = await userRepository.findProfileByName(data.name);

    if (existingProfile) {
        throw new ApiError(HTTP_STATUS.CONFLICT, MESSAGES.PROFILE_ALREADY_EXISTS);
    }

    return await userRepository.createProfile(data);
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
