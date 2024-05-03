import { NextFunction, Request, Response } from "express";
import Image from "../models/Images.model";
import Video from "../models/Videos.model";
import { errorHandler } from "../utils/error";

interface AuthenticatedReq extends Request {
  userId?: string;
}

export async function likeMedia(
  req: AuthenticatedReq,
  res: Response,
  next: NextFunction
) {
  const userId = req.userId;
  const { mediaId, type } = req.body;

  console.log(req.body);

  try {
    let media: any = "";

    if (!userId) {
      return next(errorHandler(401, "User not authenticated."));
    }

    if (type === "image") {
      media = await Image.findById(mediaId);
    } else if (type === "video") {
      media = await Video.findById(mediaId);
    } else {
      return next(errorHandler(404, "Can't find media."));
    }

    const userFound = media?.likes.includes(userId);
    const updateDB = {
      request: userFound ? "$pull" : "$push",
      message: userFound
        ? " User interaction is removed."
        : " User interaction is added.",
    };

    const updateOperation = { [updateDB.request]: { likes: userId } };

    const result = await (type === "image" ? Image : Video).updateOne(
      { _id: mediaId },
      updateOperation
    );
    if (result.modifiedCount === 0) {
      return next(
        errorHandler(404, "Media not found or user interaction not modified.")
      );
    }

    return res.status(200).json({ result });
  } catch (error) {
    next(error);
  }
}

export async function dislikeMedia(
  req: AuthenticatedReq,
  res: Response,
  next: NextFunction
) {
  const userId = req.userId;
  const { mediaId, type } = req.body;

  try {
    let media: any = "";

    if (!userId) {
      return next(errorHandler(401, "User not authenticated."));
    }

    if (type === "image") {
      media = await Image.findById(mediaId);
    } else if (type === "video") {
      media = await Video.findById(mediaId);
    } else {
      return next(errorHandler(404, "Can't find media."));
    }

    const userFound = media?.dislikes.includes(userId);
    const updateDB = {
      request: userFound ? "$pull" : "$push",
      message: userFound
        ? " User interaction is removed."
        : " User interaction is added.",
    };

    const updateOperation = { [updateDB.request]: { dislikes: userId } };

    const result = await (type === "image" ? Image : Video).updateOne(
      { _id: mediaId },
      updateOperation
    );
    if (result.modifiedCount === 0) {
      return next(
        errorHandler(404, "Media not found or user interaction not modified.")
      );
    }

    return res.status(200).json({ result });
  } catch (error) {
    next(error);
  }
}
