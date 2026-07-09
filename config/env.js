import dotenv from "dotenv";

dotenv.config();

const env = Object.freeze({
    PORT: Number(process.env.PORT) || 5000,
    NODE_ENV: process.env.NODE_ENV || "development",
    MONGO_URI: process.env.MONGO_URI,
    FRONTEND_URL: process.env.FRONTEND_URL || "http://localhost:5173",
    MORGAN_FORMAT: process.env.MORGAN_FORMAT || "dev",
});

export default env;
