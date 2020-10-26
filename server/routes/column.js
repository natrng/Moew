const router = require("express").Router();
const Column = require("../models/column.model")
let Board = require("../models/board.model");
const verify = require("./verifyToken");

router.get("/all/:id", verify, async (req, res) => {
    const boards = await Board.findById(req.params.id);
    if(!boards) return res.status(404).json({error: "Board not found"})

    const columns = boards.columns
    if(!columns) return res.status(404).json({error:"Columns not found for board"})
    res.status(200).json(columns)
})

router.get("/:id", verify, async (req,res) => {
    const column = await Column.findById(req.params.id);

    if(!column) return res.status(404).json({error: "Column not found"})

    res.status(200).json(column)
})

module.exports = router