import { GetObjectCommand, PutObjectCommand } from "@aws-sdk/client-s3";
import { getSignedUrl } from "@aws-sdk/s3-request-presigner";
import { NextFunction, Request, Response } from "express";
import Image from "../models/Images.model";
import User from "../models/Users.model";
import { errorHandler } from "../utils/error";
import { bucketName, randomImageName, s3 } from "../utils/functionsStore";

interface AuthenticatedReq extends Request {
  userId?: string;
}

export function test(res: Response) {
  res.json({
    message: "test route working",
  });
}

export async function uploadImage(
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
  const imageName = randomImageName();
  const format = req.file?.mimetype.split("/")[1];

  const params = {
    Bucket: bucketName,
    Key: imageName,
    Body: req.file?.buffer,
    ContentType: req.file?.mimetype,
  };

  //upload media to AWS
  const command = new PutObjectCommand(params);
  await s3.send(command);

  //get media url

  const newImage = new Image({
    caption,
    imageName,
    format,
    size: req.file?.size,
    uploadedBy: userId,
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
  const userId = req.userId;
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
  const userId = req.userId;
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
    const imagesCollection = await Image.find().sort({ createdAt: -1 });

    for (const image of imagesCollection) {
      const getObjectParams = {
        Bucket: bucketName,
        Key: image.imageName,
      };
      const fetchURL = new GetObjectCommand(getObjectParams);
      const url = await getSignedUrl(s3, fetchURL);
      image.Url = url;
    }

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
  const imageID = req.params.id;
  try {
    const imageData = await Image.findById(imageID);
    res.status(200).json(imageData);
  } catch (error) {
    return next(error);
  }
}
