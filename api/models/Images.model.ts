import mongoose from "mongoose";

const imageSchema = new mongoose.Schema({
  caption: {
    type: String,
    required: true,
  },
  type: {
    type: String,
    default: "image",
  },
  imageName: {
    type: String,
    required: true,
  },
  Url: {
    type: String,
  },
  format: {
    type: String,
    required: true,
    enum: ["jpeg", "jpg", "png", "gif"],
  },
  size: {
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

const Image = mongoose.model("Image", imageSchema);
export default Image;
