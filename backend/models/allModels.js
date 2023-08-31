const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const commentSchema = new Schema(
  {
    commentText: {
      type: String,
      required: true,
    },
    reactions: {
      type: String,
    },
    post: {
      type: Schema.Types.ObjectId,
      ref: "Post",
    },
  },

  { timestamps: true }
);

const Comment = mongoose.model("Comment", commentSchema);

const postSchema = new Schema(
  {
    title: {
      type: String,
      required: true,
    },
    body: {
      type: String,
      required: true,
    },
    image: {
      type: String,
    },

    user: {
      type: Schema.Types.ObjectId,
      ref: "User",
    },
  },
  { timestamps: true }
);

const Post = mongoose.model("Post", postSchema);
const userSchema = new Schema(
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
  },
  { timestamps: true }
);

const User = mongoose.model("User", userSchema);

module.exports = {
  User,
  Comment,
  Post,
};
