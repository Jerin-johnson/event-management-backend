import EventLog from "../models/EventLog.js";

export const createLog = async (logData) => {
    return await EventLog.create(logData);
};

export const getLogsByEvent = async (eventId) => {
    return await EventLog.find({ event: eventId })
        .populate("changedBy", "name")
        .sort({ createdAt: -1 });
};
