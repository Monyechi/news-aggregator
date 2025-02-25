import mongoose from "mongoose";

const UserSchema = new mongoose.Schema({
  email:    { type: String, unique: true, required: true },
  name:     { type: String },
  image:    { type: String },
  createdAt: { type: Date, default: Date.now },
});

export default mongoose.models.User || mongoose.model("User", UserSchema);
