import healthCheckRouter from "../src/routes/healthcheck.routes.js";
import authRoutes from "../src/routes/auth.routes.js";
import problemRoutes from "../src/routes/problem.routes.js";
import errorHandler from "../src/utils/error.js";
import cookieParser from "cookie-parser";
import cors from 'cors';
import express from "express";
const app = express();

// CORS configuration
app.use(
  cors({
    origin: 'http://localhost:3000', // Allow requests from your Next.js frontend
    credentials: true, // Allow cookies/credentials
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'], // Allowed HTTP methods
    allowedHeaders: ['Content-Type', 'Authorization', 'Accept'], // Allowed headers
  })
);

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use("/api/v1/healthcheck", healthCheckRouter);
app.use("/api/v1/auth", authRoutes);
app.use("/api/v1/problem", problemRoutes);
app.use(errorHandler);

export default app;
