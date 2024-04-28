import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import crypto from "crypto";
import { Request, Response, NextFunction } from "express";

import authRoutes from "./routes/auth.route";

dotenv.config();

const generateJWTSecret = () => {
  return crypto.randomBytes(64).toString("hex");
};
export const JWT_SECRET = generateJWTSecret();

const app = express();

mongoose
  .connect(process.env.MONGO!)
  .then(() => {
    console.log("connected to MONGODB");
  })
  .catch((error) => {
    console.log(error);
  });

app.use(express.json());

app.listen(3000, () => {
  console.log("Server listening on port 3000");
});

app.use("/api/auth", authRoutes);

app.use((err: any, req: Request, res: Response, next: NextFunction) => {
  const statusCode = err.statusCode || 500;
  const message = err.message || "internal server error";

  return res.status(statusCode).json({
    success: false,
    message,
    statusCode,
  });
});
