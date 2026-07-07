import express from "express";
import errorHandler from "./middlewares/error.handler.js";
const app = express();

app.get("/health", (req, res) => {
    res.status(200).json({
        success: true,
        message: "success health check",
        timestamp: new Date().toISOString(),
    });
});

app.use(errorHandler);

export default app;
