import { PAGINATION } from "../constants/control.constants.js";
import User from "../models/user.js";

export const createProfile = async (data) => {
    return await User.create(data);
};

export const findProfileByName = async (name) => {
    return await User.findOne({ name: { $regex: new RegExp(`^${name}$`, "i") } });
};

export const getProfiles = async (search = "", cursor = null, limit = PAGINATION.DEFAULT_LIMIT) => {
    const query = {};

    if (search) {
        query.name = { $regex: search, $options: "i" };
    }

    if (cursor) {
        query._id = { $lt: cursor };
    }

    return await User.find(query).sort({ _id: -1 }).limit(limit);
};

export const getUsersByIds = async (ids) => {
    if (!ids || ids.length === 0) return [];
    return await User.find({ _id: { $in: ids } });
};

export const getUserById = async (id) => {
    return await User.findById(id);
};
