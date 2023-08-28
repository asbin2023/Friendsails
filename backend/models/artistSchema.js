const mongoose = require("mongoose");

const artistSchema = new mongoose.Schema(
  {
    artist: {
      type: String,
      required: true,
    },

    rating: {
      min: 1,
      max: 10,
      type: Number,
      required: true,
    },
    url: {
      type: String,
      required: true,
    },
    artistImage: {
      type: String,
      default: "https://demofree.sirv.com/nope-not-here.jpg",
      required: true,
    },
  },
  { timestamps: true }
);

module.exports = artistSchema;
