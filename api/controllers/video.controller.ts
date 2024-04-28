import bcryptjs from "bcryptjs";
import jwt, { JwtPayload } from "jsonwebtoken";
import { Request, Response, NextFunction } from "express";

import User from "../models/Users.model";
import { errorHandler } from "../utils/error";
import { JWT_SECRET } from "..";
import Video from "../models/Videos.model";

interface AuthenticatedReq extends Request {
  user?: JwtPayload;
}

export function test(req: Request, res: Response) {
  res.json({
    message: "auth route working",
  });
}

export async function uploadVideo(
  req: AuthenticatedReq,
  res: Response,
  next: NextFunction
) {
  const userId = req.user?.id;
  const user = await User.findById(userId);

  if (!user) {
    return next(errorHandler(404, "Login required"));
  }
  const { caption, videoUrl, format, duration, createdAt } = req.body;

  const newVideo = new Video({
    caption,
    videoUrl,
    format,
    duration,
    createdAt,
  });

  try {
    await newVideo.save();
    user.uploads.push(newVideo._id);
    await user.save();

    res.status(201).json({ message: "Video uploaded successfully" });
  } catch (error) {
    return next(error);
  }
}

export async function updateVideo(
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
    await Video.findByIdAndUpdate(
      req.params.id,
      {
        $set: {
          caption,
        },
      },
      { new: true }
    );

    res.status(201).json({ message: "Video updated successfully" });
  } catch (error) {
    return next(error);
  }
}

export async function deleteVideo(
  req: AuthenticatedReq,
  res: Response,
  next: NextFunction
) {
  const userId = req.user?.id;
  const user = await User.findById(userId);

  if (!user) {
    return next(errorHandler(404, "Login required"));
  }

  const { id: videoID } = req.body;
  try {
    await Video.findByIdAndDelete(videoID);
    res.status(200).json("Video is deleted");
  } catch (error) {
    return next(error);
  }
}

export async function getVideos(
  req: AuthenticatedReq,
  res: Response,
  next: NextFunction
) {
  try {
    const videosCollection = await Video.find();
    res.status(200).json(videosCollection);
  } catch (error) {
    return next(error);
  }
}

export async function getVideo(
  req: AuthenticatedReq,
  res: Response,
  next: NextFunction
) {
  const videoID = req.params.id;
  try {
    const videoData = await Video.findById(videoID);
    res.status(200).json(videoData);
  } catch (error) {
    return next(error);
  }
}
