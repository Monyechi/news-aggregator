import mongoose from "mongoose";

const ArticleSchema = new mongoose.Schema({
  title:    { type: String, required: true },
  url:      { type: String, required: true, unique: true },
  summary:  { type: String },
  userId:   { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  createdAt: { type: Date, default: Date.now },
});

export default mongoose.models.Article || mongoose.model("Article", ArticleSchema);
