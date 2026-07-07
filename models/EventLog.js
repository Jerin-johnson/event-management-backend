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
            ref: "Profile",
            required: true,
        },
        changes: {
            type: Object,
            required: true,
        },
    },
    { timestamps: true }
);

const EventLog = mongoose.model("EventLog", eventLogSchema);
export default EventLog;
