const mongoose = require("mongoose");

const userSchema = new mongoose.Schema(
  {
    username: {
      type: String,
      required: "Username is required",
      min: 3,
    },
    email: {
      type: String,
      min: 6,
      lowercase: true,
      required: "Email address is required",
    },
    password: {
      type: String,
      required: true,
      min: 6,
      max: 100,
    },
    boards: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Board",
      },
    ],
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("User", userSchema);
