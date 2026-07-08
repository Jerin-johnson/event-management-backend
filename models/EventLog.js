import mongoose from "mongoose";

const eventLogSchema = new mongoose.Schema(
    {
        event: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Event",
            required: true,
        },
        changedBy: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User",
            required: true,
        },
        previousValues: {
            type: Object,
            required: true,
        },
        newValues: {
            type: Object,
            required: true,
        },
        changedFields: {
            type: [String],
            required: true,
        },
    },
    { timestamps: true }
);

const EventLog = mongoose.model("EventLog", eventLogSchema);
export default EventLog;
