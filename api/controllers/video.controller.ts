import { Request, Response, NextFunction } from "express";
import User from "../models/Users.model";
import { errorHandler } from "../utils/error";
import Video from "../models/Videos.model";
import { bucketName, randomImageName, s3 } from "../utils/functionsStore";
import { GetObjectCommand, PutObjectCommand } from "@aws-sdk/client-s3";
import { getSignedUrl } from "@aws-sdk/s3-request-presigner";

interface AuthenticatedReq extends Request {
  userId?: string;
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
  const userId = req.userId;

  const user = await User.findById(userId);

  if (!user) {
    return next(errorHandler(404, "Login required"));
  }

  const { caption } = req.body;
  const videoName = randomImageName();
  const format = req.file?.mimetype.split("/")[1];
  const duration = req.file?.size;

  const params = {
    Bucket: bucketName,
    Key: videoName,
    Body: req.file?.buffer,
    ContentType: req.file?.mimetype,
  };
  try {
    //upload media to AWS
    const command = new PutObjectCommand(params);
    await s3.send(command);

    const newVideo = new Video({
      caption,
      videoName,
      format,
      duration,
      uploadedBy: userId,
    });

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
  const userId = req.userId;
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
  const userId = req.userId;
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
    const videosCollection = await Video.find().sort({ createdAt: -1 });

    for (const video of videosCollection) {
      const getObjectParams = {
        Bucket: bucketName,
        Key: video.videoName,
      };
      const fetchURL = new GetObjectCommand(getObjectParams);
      const url = await getSignedUrl(s3, fetchURL);
      video.Url = url;
    }
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
