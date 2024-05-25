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
import multer from "multer";

const router = express.Router();
const storage = multer.memoryStorage();
const upload = multer({
  storage: storage,
  limits: {
    fileSize: 1024 * 1024 * 3,
  },
});

router.get("/", test);
router.post("/get", getImage);
router.post("/getall", getImages);
router.post("/upload", [authJWT, upload.single("media")], uploadImage);
router.post("/delete", authJWT, deleteImage);
router.post("/update", authJWT, updateImage);
export default router;
