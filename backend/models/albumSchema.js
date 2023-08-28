const mongoose = require("mongoose");

const albumSchema = new mongoose.Schema(
  {
    artist: {
      type: String,
      required: true,
    },
    title: {
      type: String,
      required: true,
    },
    rating: {
      min: 1,
      max: 10,
      type: Number,
      required: true,
    },
    duration: {
      type: Number,
      required: true,
    },
    label: {
      type: String,
      required: true,
    },
    explicit: {
      type: Boolean,
      required: true,
    },
    url: {
      type: String,
      required: true,
    },
    tracklist: {
      type: String,
      required: true,
    },
    artistImage: {
      type: String,
      default: "https://demofree.sirv.com/nope-not-here.jpg",
      required: true,
    },
    albumImage: {
      type: String,
      default: "https://demofree.sirv.com/nope-not-here.jpg",
      required: true,
    },
  },
  { timestamps: true }
);

module.exports = albumSchema;
