import mongoose from "mongoose";

const eventSchema = new mongoose.Schema(
    {
        // title: {
        //     type: String,  //todo :improvments : future
        //     required: true,
        //     trim: true,
        // },
        profiles: [
            {
                type: mongoose.Schema.Types.ObjectId,
                ref: "User",
                required: true,
            },
        ],
        timezone: {
            type: String,
            required: true,
        },
        startDateTime: {
            type: Date,
            required: true,
        },
        endDateTime: {
            type: Date,
            required: true,
        },
        createdBy: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User",
        },
    },
    {
        timestamps: true,
    }
);

eventSchema.index({
    profiles: 1,
    startDateTime: -1,
});

const Event = mongoose.model("Event", eventSchema);
export default Event;
