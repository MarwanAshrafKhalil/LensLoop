import mongoose from "mongoose";

const imageSchema = new mongoose.Schema({
  caption: {
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
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

const Image = mongoose.model("Image", imageSchema);
export default Image;
