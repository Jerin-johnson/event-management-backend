import Event from "../models/event.js";

export const createEvent = async (data) => {
    return await Event.create(data);
};

export const getEventsByProfile = async (profileId) => {
    return await Event.find({ profiles: profileId })
        .populate("profiles", "name timezone")
        .populate("createdBy", "name")
        .sort({ startDateTime: -1 });
};

export const findEventById = async (id) => {
    return await Event.findById(id)
        .populate("profiles", "name timezone")
        .populate("createdBy", "name");
};

export const updateEvent = async (id, updateData) => {
    return await Event.findByIdAndUpdate(id, updateData, {
        new: true,
        runValidators: true,
    })
        .populate("profiles", "name")
        .populate("createdBy", "name");
};
