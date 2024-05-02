import mongoose from "mongoose";

const imageSchema = new mongoose.Schema({
  caption: {
    type: String,
    required: true,
  },
  imageName: {
    type: String,
    required: true,
  },
  imageUrl: {
    type: String,
    required: true,
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
