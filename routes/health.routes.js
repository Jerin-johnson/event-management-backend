import express from "express";
import { checkHealthContoller } from "../controllers/health.controller";

const healthRouter = express.Router();

healthRouter.get("/", checkHealthContoller);

export default healthRouter;
