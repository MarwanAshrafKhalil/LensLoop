import bcryptjs from "bcryptjs";
import jwt from "jsonwebtoken";
import { Request, Response, NextFunction } from "express";

import User from "../models/Users.model";
import { errorHandler } from "../utils/error";
import { JWT_SECRET } from "..";

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
    return next(errorHandler(404, "username/email already taken"));
    // res.status(404).json({ message: "username/email already taken" });
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

export async function signin(req: Request, res: Response, next: NextFunction) {
  const { username, password } = req.body;
  try {
    const validUser = await User.findOne({ username });
    console.log("validuser: ", validUser);
    if (!validUser) return next(errorHandler(404, "User not found"));
    const validPassword = bcryptjs.compareSync(password, validUser.password);
    if (!validPassword) return next(errorHandler(401, "Wrong credentials"));
    const token = jwt.sign({ id: validUser._id }, JWT_SECRET);

    const { password: hashedPassword, ...rest } = validUser.toObject();
    const expiryDate = new Date(Date.now() + 3600000);
    res
      .cookie("access_token", token, {
        expires: expiryDate,
        httpOnly: true,
      })
      .json(rest);
  } catch (error) {
    next(error);
  }
}
