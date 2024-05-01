import { Request, Response, NextFunction } from "express";
import { errorHandler } from "../utils/error";
import Image from "../models/Images.model";
import { JwtPayload } from "jsonwebtoken";
import Video from "../models/Videos.model";

interface AuthenticatedReq extends Request {
  user?: JwtPayload;
}

export async function likeMedia(
  req: AuthenticatedReq,
  res: Response,
  next: NextFunction
) {
  const mediaId = req.params.MediaId;
  const userId = req.user?._id;
  const type = req.body.MediaType;

  try {
    if (type === "image") {
      const image = await Image.findById(mediaId);
      if (image?.likes.includes(userId)) {
        Image.updateOne(
          { _id: mediaId },
          { $pull: { likes: userId } },
          (err: any) => {
            if (err) {
              return next(err);
            } else {
              return res
                .status(200)
                .json({ message: "User interaction is removed." });
            }
          }
        );
      }
      image?.likes.push(userId);
      await image?.save();
      res.json({ message: "Image is liked successfully." });
    } else if (type === "video") {
      const video = await Video.findById(mediaId);
      if (video?.likes.includes(userId)) {
        Video.updateOne(
          { _id: mediaId },
          { $pull: { likes: userId } },
          (err: any) => {
            if (err) {
              return next(err);
            } else {
              return res
                .status(200)
                .json({ message: "User interaction is removed." });
            }
          }
        );
      }
      video?.likes.push(userId);
      await video?.save();
      res.json({ message: "Video liked successfully." });
    } else {
      return errorHandler(404, "Media type not valid.");
    }
  } catch (error) {
    next(error);
  }
}

export async function dislikeMedia(
  req: AuthenticatedReq,
  res: Response,
  next: NextFunction
) {
  const mediaId = req.params.MediaId;
  const userId = req.user?._id;
  const type = req.body.MediaType;

  try {
    if (type === "image") {
      const image = await Image.findById(mediaId);
      if (image?.dislikes.includes(userId)) {
        Image.updateOne(
          { _id: mediaId },
          { $pull: { likes: userId } },
          (err: any) => {
            if (err) {
              return next(err);
            } else {
              return res
                .status(200)
                .json({ message: "User interaction is removed." });
            }
          }
        );
      }
      image?.likes.push(userId);
      await image?.save();
      res.json({ message: "Image is disliked successfully." });
    } else if (type === "video") {
      const video = await Video.findById(mediaId);
      if (video?.likes.includes(userId)) {
        Video.updateOne(
          { _id: mediaId },
          { $pull: { likes: userId } },
          (err: any) => {
            if (err) {
              return next(err);
            } else {
              return res
                .status(200)
                .json({ message: "User interaction removed" });
            }
          }
        );
      }
      video?.likes.push(userId);
      await video?.save();
      res.json({ message: "Video is liked successfully." });
    } else {
      return errorHandler(404, "Media type not valid.");
    }
  } catch (error) {
    next(error);
  }
}
