const router = require("express").Router();
const Post = require("../models/post");
const auth = require("../middleware/auth");

router.post("/", auth, async (req, res) => {
  const post = await Post.create({
    user: req.user.username,
    text: req.body.text,
    image: req.body.image,
    likes: [],
    comments: [],
  });
  res.json(post);
});

router.get("/", async (_, res) => {
  const posts = await Post.find().sort({ createdAt: -1 });
  res.json(posts);
});

router.post("/:id/like", auth, async (req, res) => {
  const post = await Post.findById(req.params.id);
  if (!post.likes.includes(req.user.username)) {
    post.likes.push(req.user.username);
    await post.save();
  }
  res.json(post);
});

router.post("/:id/comment", auth, async (req, res) => {
  const post = await Post.findById(req.params.id);
  post.comments.push({ user: req.user.username, text: req.body.text });
  await post.save();
  res.json(post);
});

module.exports = router;
