import { connect } from "mongoose";
import env from "./env.js";
import { MESSAGE } from "../constants/message.constants.js";

async function connectMongoDB() {
    try {
        await connect(env.MONGO_URI);
        console.log(MESSAGE.DATABASE_CONNECTED);
    } catch (error) {
        console.error("MongoDB Database Connection Failed");
        console.error(error.message);
        console.log(MESSAGE.DATABASE_CONNECTION_FAILED);
        process.exit(1);
    }
}

export default connectMongoDB;
