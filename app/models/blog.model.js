const mongoose = require("mongoose");

const blogPostSchema = new mongoose.Schema(
  {
    title: String,
    description: String,
    author_id: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
    img: String,
    tag_ids: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Tag",
      }
    ],
    category_ids: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Category",
      }
    ],
    published: Boolean
  },
  {
    timestamps: true,
  }
);

const BlogPost = mongoose.model("BlogPost", blogPostSchema);

module.exports = BlogPost;
