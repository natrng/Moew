const router = require("express").Router();
let Column = require("../models/column.model");
let Post = require("../models/post.model");
const verify = require("./verifyToken");

router.get("/:id", verify, async (req, res) => {
  const post = await Post.findById(req.params.id);
  if (!post) return res.status(404).json({ error: "Post not found" });
  return res.status(200).json(post);
});

router.post("/create/:id", verify, async (req, res) => {
  const column = await Column.findById(req.params.id);
  if (!column) return res.status(404).json({ error: "Column not found" });
  const post = new Post({
    title: req.body.title,
    description: req.body.description,
    belongs: column,
  });
  try {
    await post.save();
    column.posts.push(post);
    await column.save();
    res.json(post);
  } catch (error) {
    res.status(400).json(error);
  }
});

module.exports = router;
