import express from "express"
import { isAuthenticated } from "../middleware/isAuthenticated.middleware.js";
import { getAllSubmission, getAllTheSubmissionsForProblem, getSubmissionsForProblem } from "../controllers/submission.controller.js";
const submissionRoutes = express.Router()
submissionRoutes.get("/get-all-submissions" , isAuthenticated , getAllSubmission);
submissionRoutes.get("/get-submission/:problemId" , isAuthenticated , getSubmissionsForProblem)
submissionRoutes.get("/get-submissions-count/:problemId" , isAuthenticated , getAllTheSubmissionsForProblem)
export default submissionRoutes;