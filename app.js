import express from "express";
import errorHandler from "./middlewares/error.handler.js";
import userRouter from "./routes/user.routes.js";
import eventRouter from "./routes/event.routes.js";
import healthRouter from "./routes/health.routes.js";
import timeZoneRouter from "./routes/timezone.routes.js";
import morgan from "morgan";
import cors from "cors";
import env from "./config/env.js";
import { API_ROUTES } from "./constants/api.constants.js";
const app = express();

app.use(morgan(env.MORGAN_FORMAT));

app.use(
    cors({
        origin: env.FRONTEND_URL,
        credentials: true,
    })
);

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

const routes = [
    {
        path: API_ROUTES.USER,
        router: userRouter,
    },
    {
        path: API_ROUTES.EVENTS,
        router: eventRouter,
    },
    {
        path: API_ROUTES.HEALTH,
        router: healthRouter,
    },
    {
        path: API_ROUTES.TIMEZONES,
        router: timeZoneRouter,
    },
];

routes.forEach(({ path, router }) => {
    app.use(path, router);
});

app.use(errorHandler);

export default app;
