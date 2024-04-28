import bcryptjs from "bcryptjs";
import jwt, { JwtPayload } from "jsonwebtoken";
import { Request, Response, NextFunction } from "express";

import User from "../models/Users.model";
import { errorHandler } from "../utils/error";
import { JWT_SECRET } from "..";

import Image from "../models/Images.model";

interface AuthenticatedReq extends Request {
  user?: JwtPayload;
}

export function test(req: Request, res: Response) {
  res.json({
    message: "auth route working",
  });
}

export async function uploadImage(
  req: AuthenticatedReq,
  res: Response,
  next: NextFunction
) {
  const userId = req.user?.id;
  const user = await User.findById(userId);

  if (!user) {
    return next(errorHandler(404, "Login required"));
  }
  const { caption, imageUrl, format, size, createdAt } = req.body;

  const newImage = new Image({
    caption,
    imageUrl,
    format,
    size,
    createdAt,
  });

  try {
    await newImage.save();
    user.uploads.push(newImage._id);
    await user.save();

    res.status(201).json({ message: "Image uploaded successfully" });
  } catch (error) {
    return next(error);
  }
}

export async function updateImage(
  req: AuthenticatedReq,
  res: Response,
  next: NextFunction
) {
  const userId = req.user?.id;
  const user = await User.findById(userId);

  if (!user) {
    return next(errorHandler(404, "Login required"));
  } else if (req.params.id !== userId) {
    return next(errorHandler(401, "You can update only your content"));
  }
  const { caption } = req.body;

  try {
    await Image.findByIdAndUpdate(
      req.params.id,
      {
        $set: {
          caption,
        },
      },
      { new: true }
    );

    res.status(201).json({ message: "Image updated successfully" });
  } catch (error) {
    return next(error);
  }
}

export async function deleteImage(
  req: AuthenticatedReq,
  res: Response,
  next: NextFunction
) {
  const userId = req.user?.id;
  const user = await User.findById(userId);

  if (!user) {
    return next(errorHandler(404, "Login required"));
  }

  const { id: imageID } = req.body;
  try {
    await Image.findByIdAndDelete(imageID);
    res.status(200).json("Image is deleted");
  } catch (error) {
    return next(error);
  }
}

export async function getImages(
  req: AuthenticatedReq,
  res: Response,
  next: NextFunction
) {
  try {
    const imagesCollection = await Image.find();
    res.status(200).json(imagesCollection);
  } catch (error) {
    return next(error);
  }
}

export async function getImage(
  req: AuthenticatedReq,
  res: Response,
  next: NextFunction
) {
  const iamgeID = req.params.id;
  try {
    const imageData = await Image.findById(iamgeID);
    res.status(200).json(imageData);
  } catch (error) {
    return next(error);
  }
}
