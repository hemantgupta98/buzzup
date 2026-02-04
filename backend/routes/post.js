const router = require("express").Router();
const mongoose = require("mongoose");
const Post = require("../models/post");
const auth = require("../middleware");

router.post("/", auth, async (req, res) => {
  try {
    const post = await Post.create({
      user: req.user.username,
      text: req.body.text,
      image: req.body.image,
      likes: [],
      comments: [],
    });
    res.json(post);
  } catch (err) {
    res.status(500).json({ msg: "Failed to create post" });
  }
});

router.get("/", async (_, res) => {
  try {
    const posts = await Post.find().sort({ createdAt: -1 });
    res.json(posts);
  } catch (err) {
    res.status(500).json({ msg: "Failed to fetch posts" });
  }
});

router.post("/:id/like", auth, async (req, res) => {
  try {
    const { id } = req.params;
    if (!mongoose.isValidObjectId(id)) {
      return res.status(400).json({ msg: "Invalid post id" });
    }
    const post = await Post.findById(id);
    if (!post) return res.status(404).json({ msg: "Post not found" });

    if (!post.likes.includes(req.user.username)) {
      post.likes.push(req.user.username);
      await post.save();
    }
    res.json(post);
  } catch (err) {
    res.status(500).json({ msg: "Failed to like post" });
  }
});

router.post("/:id/comment", auth, async (req, res) => {
  try {
    const { id } = req.params;
    if (!mongoose.isValidObjectId(id)) {
      return res.status(400).json({ msg: "Invalid post id" });
    }
    const post = await Post.findById(id);
    if (!post) return res.status(404).json({ msg: "Post not found" });

    post.comments.push({ user: req.user.username, text: req.body.text });
    await post.save();
    res.json(post);
  } catch (err) {
    res.status(500).json({ msg: "Failed to add comment" });
  }
});

module.exports = router;
