const express = require("express");
const morgan = require("morgan");
const helmet = require("helmet");
const cors = require("cors");
const mongoose = require("mongoose");

const userRoutes = require("../routes/users");
const boardRoutes = require("../routes/board");
const postRoutes = require("../routes/post")
const columnRoutes = require('../routes/column')

require("dotenv").config();

const middleware = require("./middlewares");

const app = express();

app.use(morgan("dev"));
app.use(helmet());
app.use(cors());
app.use(express.json());

mongoose.connect(
  process.env.ATLAS_URI,
  {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  },
  () => console.log("Connected to the db")
);


app.use("/api/user", userRoutes);
app.use("/api/board", boardRoutes);
app.use("/api/post", postRoutes)
app.use("/api/column", columnRoutes)

app.use(middleware.notFound);
app.use(middleware.errorHandler);

module.exports = app;
