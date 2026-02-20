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


const followmodel = mongoose.model("follows", followschema);



module.exports = followmodel;