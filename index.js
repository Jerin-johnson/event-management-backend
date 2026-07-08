import app from "./app.js";
import connectMongoDB from "./config/database.connect.js";
import env from "./config/env.js";
import { MESSAGE } from "./constants/message.constants.js";

async function startServer() {
    await connectMongoDB();
    app.listen(env.PORT, () => {
        console.log(`${MESSAGE.SERVER_RUNNING} on port ${env.PORT}`);
    });
}

startServer();
