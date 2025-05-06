import express from "express";
import {
  isAuthenticated,
  checkAdmin,
} from "../middleware/isAuthenticated.middleware.js";
import {
  createProblem,
  deleteProblem,
  getAllProblems,
  getAllProblemsSolvedByUser,
  getProblemById,
  updateProblem,
} from "../controllers/problem.controller.js";
const problemRoutes = express.Router();
problemRoutes.post(
  "/create-problem",
  isAuthenticated,
  checkAdmin,
  createProblem,
);
problemRoutes.get("/get-all-problems", isAuthenticated, getAllProblems);
problemRoutes.get("/get-problem/:id", isAuthenticated, getProblemById);
problemRoutes.put(
  "/update-problem/:id",
  isAuthenticated,
  checkAdmin,
  updateProblem,
);
problemRoutes.delete(
  "/delete-problem/:id",
  isAuthenticated,
  checkAdmin,
  deleteProblem,
);
problemRoutes.get(
  "/get-solved-problems",
  isAuthenticated,
  getAllProblemsSolvedByUser,
);

export default problemRoutes;
