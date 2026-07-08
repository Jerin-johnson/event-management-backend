import express from "express";
import errorHandler from "./middlewares/error.handler.js";
import userRouter from "./routes/user.routes.js";
import eventRouter from "./routes/event.routes.js";
import healthRouter from "./routes/health.routes.js";
import timeZoneRouter from "./routes/timezone.routes.js";

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use("/api/v1/users", userRouter);
app.use("/api/v1/events", eventRouter);
app.use("/api/v1/health", healthRouter);
app.use("/api/v1/timezones", timeZoneRouter);

app.use(errorHandler);

export default app;
