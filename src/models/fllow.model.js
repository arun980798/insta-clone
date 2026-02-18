const mongoose = require("mongoose");

const followschema = new mongoose.Schema(
  {
    follower: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "users",
      required: [true, "follower id is required "],
    },
    followee: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "users",
      required: [true, "followee id is required "],
    },
  },
  {
    timestamp: true,
  },
);


const followmodel = mongoose.model("follows", followschema);