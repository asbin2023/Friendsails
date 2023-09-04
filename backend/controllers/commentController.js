const { User, Post, Comment } = require("../models/allModels");
const mongoose = require("mongoose");

module.exports.getComments = async (req, res) => {
  try {
    const { id, username } = req;
    const { postId } = req.params;

    if (!id || !username || !postId) {
      return res.status(400).json({ message: "missing credentials" });
    }
    const comments = await Comment.find({ post: postId }).populate(
      "post",
      "title body createdAt"
    );
    res.status(200).json({ comments });
  } catch (err) {
    console.log("error in comment controller");
    console.log(err.message);
  }
};
// /user/posts/comments/singleComment/:commentId

module.exports.getSingleComment = async (req, res) => {
  console.log("hi");
  try {
    const { id, username } = req;
    const { commentId } = req.params;
    if (!id || !username || !commentId) {
      return res.status(400).json({ msg: "not allowerd" });
    }
    const comment = await Comment.findOne({ _id: commentId });
    res.status(200).json({ comment });
  } catch (err) {
    res.status(404).json({ err });
  }
};

// commentText

module.exports.postComment = async (req, res) => {
  try {
    const { id, username } = req;
    const { postId } = req.params;
    const { commentText } = req.body;

    if (!id || !username || !postId || !commentText) {
      return res.status(400).json({ message: "missing credentials" });
    }
    const post = await Post.findOne({ _id: postId });
    console.log(post);
    if (!post) {
      return res.status(400).json({ message: "post required" });
    }

    const comment = await Comment.create({
      commentText,
      post,
      user: username,
    });
    await Post.findByIdAndUpdate(postId, {
      $push: {
        comments: comment,
      },
    });

    res.status(200).json({ comment });
  } catch (err) {
    console.log("err with post comment on commentcontroller");
    console.log(err.message);
  }
};

module.exports.deleteComment = async (req, res) => {
  try {
    const { id, username } = req;
    const { postId, commentId } = req.params;

    if (!id || !username || !postId || !commentId) {
      return res.status(400).json({ message: "missing credentials" });
    }
    console.log("this is the username", username);

    let deletedComment = await Comment.findOneAndDelete({
      _id: commentId,
      post: postId,
      user: username,
    });
    console.log("dis th deleted c", deletedComment);
    if (!deletedComment) {
      res.status(400).json({ message: "user wrong" });
    }

    res.status(200).json({ message: "deleted comment" });
  } catch (err) {
    console.log("err with post comment on commentcontroller");
    console.log(err.message);
  }
};

module.exports.updateComment = async (req, res) => {
  try {
    const { id, username } = req;
    const { commentText } = req.body;
    const { postId, commentId } = req.params;

    if (!id || !username || !commentText || !postId || !commentId) {
      return res.status(404).json({ message: "unauthorized" });
    }
    const comment = await Comment.findOneAndUpdate(
      { _id: commentId, post: postId, user: username },
      { commentText },
      { new: true }
    );
    console.log("dios the commnet", comment);
    if (!comment) {
      return res.status(400).json({ message: "wring user. not allowed" });
    }
    res.status(200).json({ comment });
  } catch (err) {
    console.log(err.message);
  }
};
