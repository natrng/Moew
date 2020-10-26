const router = require("express").Router();
let User = require("../models/user.model");
const { logValidator, regValidator } = require("../validation");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const defaultBoard = require('../models/defaultBoard');

router.get("/:username", async (req, res) => {
  const user = await User.findOne({ username: req.params.username });
  if(!user) return res.status(404).json({error: "no user found"})
  return res.status(200).json(user);
});

//Create user
router.post("/register", async (req, res) => {
  const userExist = await User.findOne({ email: req.body.email });
  if (userExist) return res.status(400).json({ error: "Email already exists" });

  if (userExist && userExist.username === req.body.username)
    return res
      .status(400)
      .json({ error: "Username is taken, try another one" });

  const { error } = regValidator(req.body);
  if (error) return res.status(400).json(error);

  const salt = await bcrypt.genSalt(10);
  const hashedPwd = await bcrypt.hash(req.body.password, salt);
  const initialBoard = await defaultBoard("Welcome to Moew", false);

  const user = new User({
    username: req.body.username,
    email: req.body.email,
    password: hashedPwd
  });
  try {
    user.boards.push(initialBoard);
    initialBoard.user = user
    await user.save()
    await initialBoard.save()
    res.json(user);
  } catch (err) {
    console.log(err)
    res.status(400).json(err);
  }
});

router.post("/login", async (req, res) => {
  const { error } = logValidator(req.body);
  if (error) return res.status(400).json(error);

  const user = await User.findOne({ email: req.body.email });
  if (!user)
    return res.status(400).json({ error: "Email or password is wrong" });

  const validPwrd = await bcrypt.compare(req.body.password, user.password);
  if (!validPwrd)
    return res.status(400).json({ error: "Email or password is wrong" });

  const token = jwt.sign({ _id: user._id }, process.env.TOKEN_SECRET);
  res.header("auth-token", token).json(token);
});

module.exports = router;
