import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
  username: { type: String, required: true, unique: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  image: { type: String },
  DOB: { type: Date },
  uploads: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Media",
    },
  ],
});

const User = mongoose.model("User", userSchema);

export default User;
