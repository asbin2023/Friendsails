const mongoose = require("mongoose");
const songSchema = require("./songSchema");
const albumSchema = require("./albumSchema");
const artistSchema = require("./artistSchema");

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
    songList: {
      type: [songSchema],
    },
    albumList: {
      type: [albumSchema],
    },
    artistList: {
      type: [artistSchema],
    },
  },
  { timestamps: true }
);

const User = mongoose.model("User", userSchema);

module.exports = User;
