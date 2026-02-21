const mongoose = require("mongoose");

const followschema = new mongoose.Schema(
  {
    follower: {
     type:"String",
    },
    followee: {
      type:"String",
    },
  },
  {
    timestamp: true,
  },
);
followschema.index({ follower: 1, followee: 1 }, { unique: true });


const followmodel = mongoose.model("follows", followschema);



module.exports = followmodel;