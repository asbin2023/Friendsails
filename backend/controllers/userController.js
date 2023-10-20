const { User } = require("../models/allModels");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

module.exports.signup = async (req, res) => {
  try {
    const { username, email, password } = req.body;

    if (!username || !email || !password)
      return res.status(400).json("Invalid fields");

    const existingUser = await User.findOne({ username });

    if (existingUser) {
      return res.status(400).json("Username already exists");
    }
    const existingUser2 = await User.findOne({ email });

    if (existingUser2) {
      return res.status(400).json("Email already exists");
    }

    const hashedPass = await bcrypt.hash(password, Number(process.env.SALT));

    let newUser = await User.create({ username, email, password: hashedPass });

    const token = jwt.sign(
      { id: newUser._id, username: newUser.username },
      process.env.SECRET,
      { expiresIn: "7d" }
    );

    res.status(200).json({ token, username: newUser.username });
  } catch (err) {
    console.log("error in userController");
    console.log(err.message);
  }
};

module.exports.login = async (req, res) => {
  try {
    const { username, password } = req.body;
    if (!username || !password)
      return res.status(400).json("all fields must be filled");

    const user = await User.findOne({ username });
    // console.log("this is the user on login");
    // console.log("-/-/-/-/-/-/-/-/-/-/");
    // console.log(user);

    if (!user) return res.status(400).json("user doesnt exist");

    const pass = await bcrypt.compare(password, user.password);

    if (!pass) return res.status(400).json("incorrect password");

    const token = jwt.sign(
      { id: user._id, username: user.username },
      process.env.SECRET,
      { expiresIn: "7d" }
    );

    res.status(200).json({ token, username: user.username });
  } catch (err) {
    console.log("error in userController, login");
    console.log(err.message);
  }
};

//later on add packages to verify email && check password
//generate  a token & store it in a cookkie

module.exports.search = async (req, res) => {
  try {
    console.log("in here");
    const { id, username } = req;
    const { searchUsername } = req.params;
    console.log(id, username, searchUsername);
    if (!username || !id || !searchUsername)
      return res.status(400).json("token issue");

    const foundUser = await User.findOne({ username: searchUsername });
    console.log(foundUser);
    res.status(200).json({ user: foundUser });
  } catch (err) {
    console.log(err);
  }
};

module.exports.getAllUsers = async (req, res) => {
  try {
    const { id, username } = req;
    if (!id || !username) {
      return res.status(404).json({ msg: "not allowed" });
    }
    const users = await User.find();
    console.log(users);
    res.status(200).json({ users: users });
  } catch (err) {
    console.log(err);
    res.status(400).json({ err });
  }
};
