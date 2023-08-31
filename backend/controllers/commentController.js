const User = require("../models/userModel");
const mongoose = require("mongoose");

module.exports.getComments = async (req, res) => {
  try {
    const { id, username } = req;
    const { postId } = req.params;

    if (!id || !username || !postId) {
      return res.status(400).json({ message: "missing credentials" });
    }
    const user = await User.findById(id);

    let post = user.posts.filter((item) => item._id == postId);
    res.status(200).json({ comments: post[0].comments });
  } catch (err) {
    console.log("error in comment controller");
    console.log(err.message);
  }
};

// commentText

module.exports.postComment = async (req, res) => {
  console.clear();
  try {
    const { id, username } = req;
    const { postId } = req.params;
    const { commentText } = req.body;

    if (!id || !username || !postId || !commentText) {
      return res.status(400).json({ message: "missing credentials" });
    }

    const user = await User.findOneAndUpdate(
      { _id: id, "posts._id": postId },
      {
        $push: {
          "posts.$.comments": {
            commentText,
          },
        },
      },
      { new: true }
    );

    res.status(200).json({ user });
  } catch (err) {
    console.log("err with post comment on commentcontroller");
    console.log(err.message);
  }
};
