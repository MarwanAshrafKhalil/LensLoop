import cookieParser from "cookie-parser";
import crypto from "crypto";
import dotenv from "dotenv";
import express, { NextFunction, Request, Response } from "express";
import mongoose from "mongoose";

import authRoutes from "./routes/auth.route";
import imgRoutes from "./routes/images.route";
import likeRoutes from "./routes/like.route";
import videoRoutes from "./routes/videos.route";

dotenv.config();

const generateJWTSecret = () => {
  return crypto.randomBytes(64).toString("hex");
};
export const JWT_Backup = generateJWTSecret();

export const JWT_SECRET = process.env.JWT || JWT_Backup;

const app = express();

mongoose
  .connect(process.env.MONGO!)
  .then(() => {
    console.log("connected to MONGODB");
  })
  .catch((error) => {
    console.log(error);
  });

app.listen(3000, () => {
  console.log("Server listening on port 3000");
});
app.use(express.json());
app.use(cookieParser());
app.use("/api/auth", authRoutes);
app.use("/api/image", imgRoutes);
app.use("/api/video", videoRoutes);
app.use("/api/inter", likeRoutes);

app.use((err: any, req: Request, res: Response, next: NextFunction) => {
  const statusCode = err.statusCode || 500;
  const message = err.message || "internal server error";

  return res.status(statusCode).json({
    success: false,
    message,
    statusCode,
  });
});
