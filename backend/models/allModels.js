const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const commentSchema = new Schema(
  {
    commentText: {
      type: String,
      required: true,
    },
    reactions: {
      type: String,
    },
    user: {
      type: String,
      required: true,
    },
    post: {
      type: Schema.Types.ObjectId,
      ref: "Post",
    },
    edited: {
      type: Boolean,
      default: false,
    },
    userPicture: {
      type: String,
    },
    name: {
      type: String,
    },
  },

  { timestamps: true }
);

const Comment = mongoose.model("Comment", commentSchema);

const postSchema = new Schema(
  {
    title: {
      type: String,
      required: true,
    },
    body: {
      type: String,
      required: true,
    },
    image: {
      type: String,
    },
    author: {
      type: String,
      required: true,
    },

    user: {
      type: Schema.Types.ObjectId,
      ref: "User",
    },
    comments: {
      type: [Schema.Types.ObjectId],
      ref: "Comment",
    },
    edited: {
      type: Boolean,
      default: false,
    },
  },
  { timestamps: true }
);

const Post = mongoose.model("Post", postSchema);
const userSchema = new Schema(
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
    friendRequest: [String],
    friends: [String],
  },
  { timestamps: true }
);

const User = mongoose.model("User", userSchema);

//add hobbies later on
//also privacy

const userProfileSchema = new Schema({
  picture: {
    type: String,
    required: true,
  },
  background: {
    type: String,
    required: true,
  },
  name: {
    type: String,
    required: true,
  },
  about: {
    type: String,
    required: true,
  },
  location: {
    type: String,
    required: true,
  },
  link: {
    type: String,
    required: true,
  },
  username: {
    type: String,
    required: true,
  },
  user: {
    type: Schema.Types.ObjectId,
    ref: "User",
  },
});

const UserProfile = mongoose.model("UserProfile", userProfileSchema);

module.exports = {
  User,
  Comment,
  Post,
  UserProfile,
};
