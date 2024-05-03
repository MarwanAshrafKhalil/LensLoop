import express from "express";
import { dislikeMedia, likeMedia } from "../controllers/likes.controller";
import { authJWT } from "../utils/authJWT";

const router = express.Router();

router.post("/like", authJWT, likeMedia);
router.post("/dislike", authJWT, dislikeMedia);

export default router;
