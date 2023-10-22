const { User, Post, Comment } = require("../models/allModels");

module.exports.getPosts = async (req, res) => {
  try {
    let { id, username } = req;
    if (!id || !username) {
      return res.status(404).json("unauthorized");
    }
    const posts = await Post.find({ user: id }).populate(
      "comments",
      "commentText createdAt user edited userPicture name"
    );

    console.log("/////////");

    res.status(200).json({ posts });
  } catch (err) {
    console.log(err.message);
  }
};
module.exports.getGeneralPosts = async (req, res) => {
  try {
    let { id, username } = req;
    let { author } = req.params;
    if (!id || !username || !author) {
      return res.status(404).json("unauthorized");
    }
    const posts = await Post.find({ author }).populate(
      "comments",
      "commentText createdAt user edited userPicture name"
    );
    console.log(posts.length);
    if (posts.length < 1) {
      return res.status(400).json({ err: "author doesnt exist" });
    }

    res.status(200).json({ posts });
  } catch (err) {
    console.log(err.message);
  }
};

module.exports.createPost = async (req, res) => {
  try {
    let { id, username } = req;
    let { title, body, image } = req.body;
    if (!id || !username || !title || !body) {
      return res.status(404).json("unauthorized");
    }
    const user = await User.findOne({ _id: id, username });
    const post = await Post.create({
      title,
      body,
      image,
      user,
      author: username,
    });

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

    const post = await Post.findOneAndUpdate(
      { _id: postId, user: id },
      { title, body, image, edited: true },
      { new: true }
    );
    if (!post) {
      return res.status(404).json({
        msg: "not authorized",
      });
    }
    console.log(post, "da post in updatePost");
    res.status(200).json({ post });
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

    const deletedPost = await Post.findOneAndDelete({ _id: postId, user: id });
    console.log("this da dleted pst", deletedPost);
    if (deletedPost) {
      await Comment.findOneAndDelete({ post: postId });
    } else {
      return res.status(404).json({
        message: "not allowed ",
      });
    }

    res.status(200).json({ message: "successfully deleted the post" });
  } catch (err) {
    console.log("error in deleting post in controlller");
    console.log(err.message);
  }
};

module.exports.getSinglePost = async (req, res) => {
  try {
    const { id, username } = req;
    const { postId } = req.params;
    if (!id || !username || !postId) {
      return res.status(404).json({ message: "missing cre" });
    }
    const post = await Post.findById(postId).populate(
      "comments",
      "createdAt commentText user edited userPicture name"
    );
    res.status(200).json({ post });
  } catch (err) {
    console.log(err);
  }
};

module.exports.getAllPosts = async (req, res) => {
  try {
    let { id, username } = req;

    if (!id || !username) {
      return res.status(404).json("unauthorized");
    }
    const posts = await Post.find().populate(
      "comments",
      "commentText createdAt user edited userPicture name"
    );
    console.log(posts.length);
    if (posts.length < 1) {
      return res.status(400).json({ err: "promblem with get all posts in controller" });
    }

    res.status(200).json({ posts });
  } catch (err) {
    console.log(err.message);
  }
};