const { User, UserProfile } = require("../models/allModels");

module.exports.getProfile = async (req, res) => {
  try {
    const { id, username } = req;
    const { usernameParam } = req.params;
    console.log(id, username, usernameParam);
    if (!id || !username || !usernameParam) {
      return res.status(404).json({ message: "not authorized" });
    }
    const userProfile = await UserProfile.findOne({
      username: usernameParam,
    }).populate("user", "email");
    res.status(200).json({ userProfile });
  } catch (err) {
    console.log(err.message);
  }
};
module.exports.postProfile = async (req, res) => {
  try {
    const { id, username } = req;
    const { picture, background, name, about, location, link } = req.body;
    if (
      !id ||
      !username ||
      !picture ||
      !background ||
      !name ||
      !about ||
      !location ||
      !link
    ) {
      return res.status(404).json({
        message: "not authorized / missing",
      });
    }
    const user = await User.findOne({ _id: id, username });
    const userProfile = await UserProfile.create({
      ...req.body,
      username,
      user,
    });
    res.status(200).json({ userProfile });
  } catch (err) {
    console.log(err.message);
  }
};
module.exports.updateProfile = async (req, res) => {
  try {
    const { id, username } = req;
    console.log(req.body);

    if (!id || !username) {
      return res.status(404).json({
        message: "not authorized / missing",
      });
    }

    const userProfile = await UserProfile.findOneAndUpdate(
      { user: id, username },
      { ...req.body },
      { new: true }
    );
    console.log(userProfile);
    res.status(200).json({ userProfile });
  } catch (err) {
    console.log(err.message);
  }
};
