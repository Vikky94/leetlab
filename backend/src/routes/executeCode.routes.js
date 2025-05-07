import express from "express";
import {
    isAuthenticated
} from "../middleware/isAuthenticated.middleware.js";
import { executeCode } from "../controllers/executeCode.controller.js";
const executionRoute = express.Router();
executionRoute.post("/", isAuthenticated, executeCode)
export default executionRoute;