const mongoose = require("mongoose");

const postschema = new mongoose.Schema({
  caption: {
    type: String,
    default: "",
  },
  imgurl: {
    type: String,
    required: [true, "img is required to  create a post "],
  },
  user: {
    type: String,
    ref: "users",
    required: [true, "user idd is required "],
  },
});

const postmodel = mongoose.model("post", postschema);

module.exports = postmodel;
