import express from "express";
import multer from "multer";
import {
  deleteVideo,
  getVideo,
  getVideos,
  test,
  updateVideo,
  uploadVideo,
} from "../controllers/video.controller";
import { authJWT } from "../utils/authJWT";
const router = express.Router();
const storage = multer.memoryStorage();
const upload = multer({ storage: storage });

router.get("/", test);
router.post("/get", getVideo);
router.post("/getall", getVideos);
router.post("/upload", [authJWT, upload.single("media")], uploadVideo);
router.post("/delete", authJWT, deleteVideo);
router.post("/update", authJWT, updateVideo);
export default router;
