import mongoose from "mongoose";

const profileSchema = new mongoose.Schema(
    {
        name: {
            type: String,
            required: true,
            trim: true,
            minlength: 2,
            maxlength: 100,
        },
        timezone: {
            type: String,
            required: true,
            default: "Asia/Kolkata",
        },
    },
    {
        timestamps: true,
    }
);

const Profile = mongoose.model("Profile", profileSchema);
export default Profile;
