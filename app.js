import express from "express";
import errorHandler from "./middlewares/error.handler.js";
import userRouter from "./routes/user.routes.js";
import eventRouter from "./routes/event.routes.js";

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use("/api/v1/users", userRouter);
app.use("/api/events", eventRouter);

app.get("/health", (req, res) => {
    res.status(200).json({
        success: true,
        message: "success health check",
        timestamp: new Date().toISOString(),
    });
});

app.use(errorHandler);

export default app;
