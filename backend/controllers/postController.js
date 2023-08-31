const { User, Post, Comment } = require("../models/allModels");

module.exports.getPosts = async (req, res) => {
  try {
    let { id, username } = req;
    if (!id || !username) {
      return res.status(404).json("unauthorized");
    }
    const posts = await Post.find({ user: id }).populate("user", "username");

    res.status(200).json({ posts });
  } catch (err) {
    console.log(err.message);
  }
};

module.exports.createPost = async (req, res) => {
  console.clear();
  console.log(req.body);
  try {
    let { id, username } = req;
    let { title, body, image } = req.body;
    if (!id || !username || !title || !body) {
      return res.status(404).json("unauthorized");
    }
    const user = await User.findOne({ _id: id, username });
    const post = await Post.create({ title, body, image, user });

    return res.status(200).json({ post });
  } catch (err) {
    console.log("error in createPost in controller");
    console.log(err.message);
  }
};

module.exports.updatePost = async (req, res) => {
  try {
    const { id, username } = req;
    const { postId } = req.params;
    const { title, body, image } = req.body;
    if (!id || !username || !postId || !title || !body) {
      return res.status(403).json({ message: "unauthorized" });
    }

    const user = await User.findOneAndUpdate(
      {
        _id: id,
        "posts._id": postId,
      },
      {
        "posts.$.title": title,
        "posts.$.body": body,
        "posts.$.image": image,
      },
      { new: true }
    );
    res.status(200).json({ user });
  } catch (err) {
    console.log("error in the updatePost controller");
    console.log(err.message);
  }
};

module.exports.deletePost = async (req, res) => {
  try {
    const { id, username } = req;
    const { postId } = req.params;
    if (!id || !username || !postId) {
      return res.status(403).json({ message: "unauthorized" });
    }
    const user = await User.findByIdAndUpdate(id, {
      $pull: {
        posts: { _id: postId },
      },
    });
    res.status(200).json({ message: "successfully deleted the user" });
  } catch (err) {
    console.log("error in deleting post in controlller");
    console.log(err.message);
  }
};
