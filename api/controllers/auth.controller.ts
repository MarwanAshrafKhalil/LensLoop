import bcryptjs from "bcryptjs";
// import jwt from "jsonwebtoken";
import { Request, Response, NextFunction } from "express";

import User from "../models/Users.model";

export function test(req: Request, res: Response) {
  res.json({
    message: "auth route working",
  });
}

export async function signup(req: Request, res: Response, next: NextFunction) {
  const { username, email, password, DOB } = req.body;
  const hashedPassword = bcryptjs.hashSync(password, 10);
  const existingUser = await User.findOne({ $or: [{ username }, { email }] });
  if (existingUser) {
    res.status(400).json({ message: "username/email already taken" });
  } else {
    const newUser = new User({
      username,
      email,
      password: hashedPassword,
      DOB,
    });
    try {
      await newUser.save();
      res.status(201).json({ message: "Signup successfully." });
    } catch (error) {
      next(error);
    }
  }
}
