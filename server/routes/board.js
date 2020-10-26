const router = require("express").Router();
const verify = require("./verifyToken");
let Board = require("../models/board.model");
let Column = require("../models/column.model");
let User = require("../models/user.model");
const defaultBoard = require("../models/defaultBoard");

router.get("/", verify, async (req, res) => {
  const user = await User.findById(req.user._id)
  if(!user) return res.status(404).json({error: "User not found"})

  const boards = user.boards;
  if(!boards) return res.status(404).json({error: "Boards not found for user!"})

  res.status(200).json(boards);
})

router.get("/:id", verify, async (req, res) => {
  const board = await Board.findById(req.params.id);
  if (!board) return res.status(404).json({ error: "Board not found" });
  res.status(200).json(board);
});

router.post("/column/:id", verify, async (req, res) => {
  const board = await Board.findById(req.params.id);
  if (!board) return res.status(404).json({ error: "Board not found" });

  const column = new Column({
    title: req.body.title,
  });

  try {
    await column.save();
    board.columns.push(column);
    await board.save();
    res.status(200).json(board);
  } catch (error) {
    res
      .status(400)
      .json({ error: "There has been a problem creating a column" });
  }
});

router.post("/create", verify, async (req, res) => {
  const user = await User.findById(req.user._id);
  if (!user) return res.status(404).json({ error: "User not found" });
  const board = await defaultBoard(req.body.title, false, user);
  user.boards.push(board);
  try {
    await board.save();
    await user.save();
    res.status(200).json(board);
  } catch (error) {
    res.json(error);
  }
});

router.post("/delete/:id", verify, async (req, res) => {
  const result = await Board.deleteOne({ _id: req.params.id });
  if (result.deletedCount === 1) return res.status(200);
  else return res.status(404).json({ error: "No board was found" });
});
module.exports = router;
