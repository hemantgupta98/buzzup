const mongoose = require("mongoose");

const PostSchema = new mongoose.Schema(
  {
    user: String,
    text: String,
    image: String,
    likes: [String],
    comments: [
      {
        user: String,
        text: String,
      },
    ],
  },
  { timestamps: true },
);

module.exports = mongoose.model("Post", PostSchema);
