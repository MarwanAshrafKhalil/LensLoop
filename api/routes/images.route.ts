import express from "express";
import { authJWT } from "../utils/authJWT";
import {
  deleteImage,
  getImage,
  getImages,
  test,
  updateImage,
  uploadImage,
} from "../controllers/image.controller";

const router = express.Router();

router.get("/", test);
router.post("/get", getImage);
router.post("/getAll", getImages);
router.post("/upload", authJWT, uploadImage);
router.post("/delete", authJWT, deleteImage);
router.post("/update", authJWT, updateImage);
export default router;
