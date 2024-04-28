import express from "express";
import { authJWT } from "../utils/authJWT";
import {
  deleteVideo,
  getVideo,
  getVideos,
  test,
  updateVideo,
  uploadVideo,
} from "../controllers/video.controller";
const router = express.Router();

router.get("/", test);
router.post("/get", getVideo);
router.post("/getAll", getVideos);
router.post("/upload", authJWT, uploadVideo);
router.post("/delete", authJWT, deleteVideo);
router.post("/update", authJWT, updateVideo);
export default router;
