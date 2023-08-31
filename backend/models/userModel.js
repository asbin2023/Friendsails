const mongoose = require("mongoose");

const commentSchema = new mongoose.Schema(
  {
    commentText: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
);

const postSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
    },
    body: {
      type: String,
    },
    image: {
      type: String,
    },
    comments: [commentSchema],
  },
  { timestamps: true }
);

const userSchema = new mongoose.Schema(
  {
    username: {
      type: String,
      unique: true,
      minLength: 4,
      required: true,
    },
    email: {
      type: String,
      unique: true,
      required: true,
    },
    password: {
      type: String,
      required: true,
    },
    posts: [postSchema],
  },
  { timestamps: true }
);

const User = mongoose.model("User", userSchema);

module.exports = User;
