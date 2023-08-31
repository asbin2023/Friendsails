const User = require("../models/userModel");

module.exports.getPosts = async (req, res) => {
  try {
    let { id, username } = req;
    if (!id || !username) {
      return res.status(404).json("unauthorized");
    }
    const foundUser = await User.findOne({ _id: id, username });
    res.status(200).json({ posts: foundUser.posts });
  } catch (err) {
    console.log(err.message);
  }
};

module.exports.createPost = async (req, res) => {
  try {
    let { id, username } = req;
    let { title, body } = req.body;
    if (!id || !username) {
      return res.status(404).json("unauthorized");
    }
    if (!title || !body) {
      return res.status(400).json({ message: "missing fields" });
    }
    const user = await User.findByIdAndUpdate(
      id,
      {
        $push: {
          posts: { ...req.body },
        },
      },
      { new: true }
    );
    return res.status(200).json({ posts: user.posts });
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
    if (!id || !username) {
      return res.status(403).json({ message: "unauthorized" });
    }
    if (!title || !body) {
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
  } catch (err) {
    console.log("error in deleting post in controlller");
    console.log(err.message);
  }
};
