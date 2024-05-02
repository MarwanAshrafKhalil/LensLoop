import mongoose from "mongoose";

const videoSchema = new mongoose.Schema({
  caption: {
    type: String,
    required: true,
  },
  videoName: {
    type: String,
    required: true,
  },
  videoUrl: {
    type: String,
    required: true,
  },
  format: {
    type: String,
    required: true,
    enum: ["mp4", "avi", "mov", "wmv", "mkv"],
  },
  duration: {
    type: Number,
    required: true,
  },
  likes: [{ type: mongoose.Schema.Types.ObjectId, ref: "User" }],
  dislikes: [{ type: mongoose.Schema.Types.ObjectId, ref: "User" }],
  uploadedBy: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

const Video = mongoose.model("Video", videoSchema);

export default Video;
