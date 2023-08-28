const mongoose = require("mongoose");

const songSchema = new mongoose.Schema(
  {
    artist: {
      type: String,
      required: true,
    },
    title: {
      type: String,
      required: true,
    },
    url: {
      type: String,
      required: true,
    },
    rating: {
      min: 1,
      max: 10,
      type: Number,
      required: true,
    },
    released: {
      type: String,
      required: true,
    },
    duration: {
      type: Number,
      required: true,
    },
    preview: {
      type: String,
      required: true,
    },
    explicit: {
      type: Boolean,
      required: true,
    },
    artistImage: {
      type: String,
      default: "https://demofree.sirv.com/nope-not-here.jpg",
      required: true,
    },
    trackImage: {
      type: String,
      default: "https://demofree.sirv.com/nope-not-here.jpg",
      required: true,
    },
  },
  { timestamps: true }
);

module.exports = songSchema;
