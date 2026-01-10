import mongoose from "mongoose";

const articleSchema = new mongoose.Schema({
  title: String,
  slug: String,
  content: String,
  categorySlug: String,
  metaTitle: String,
  metaDescription: String,
  status: {
    type: String,
    enum: ["draft", "published"],
    default: "draft",
  },
  createdAt: {
    type: Date,
    default: Date.now
  },
  youtubeTitle: {
  type: String,
},

youtubeUrl: {
  type: String,
},
});

export default mongoose.model("Article", articleSchema);
