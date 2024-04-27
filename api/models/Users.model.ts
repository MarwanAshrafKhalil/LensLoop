import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
  username: { type: String, required: true, unique: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  image: { type: String },
  DOB: { type: Date, required: true },
  uploads: [
    {
      id: { type: String, required: true, unique: true },
      // uploadedAt,size,likes,dislikes
    },
  ],
});

const User = mongoose.model("User", userSchema);

module.exports = User;
