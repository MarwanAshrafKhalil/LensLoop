import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import crypto from "crypto";
// import jwt from "jsonwebtoken";
import authRoutes from "./routes/auth.route";

dotenv.config();

mongoose
  .connect(process.env.MONGO!)
  .then(() => {
    console.log("connected to MONGODB");
  })
  .catch((error) => {
    console.log(error);
  });
const app = express();

const generateJWTSecret = () => {
  return crypto.randomBytes(64).toString("hex");
};

export const JWT_SECRET = generateJWTSecret();

app.use(express.json());

app.listen(3000, () => {
  console.log("Server listening on port 3000");
});

app.use("/api/auth", authRoutes);
