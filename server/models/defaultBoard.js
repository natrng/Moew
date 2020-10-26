let Board = require("../models/board.model");
let Column = require("../models/column.model");

const defaultBoard = async (title, starred) => {
    const toDoColumn = new Column({
      title: "To do",
      posts: [],
    });

    const doingColumn = new Column({
      title: "Doing",
      posts: [],
    });
    
    const doneColumn = new Column({
        title: "Done",
        posts: [],
    });
    const initialBoard = new Board({
        title: title,
        stared: starred,
        columns: [toDoColumn, doingColumn, doneColumn],
    })
    try {
        await doneColumn.save()
        await doingColumn.save()
        await toDoColumn.save()
        await initialBoard.save()
    } catch (error) {
        res.status(400).json(error);
    }
    return initialBoard;
}

module.exports = defaultBoard;
