const mongoose = require("mongoose"); 

const userSchema = new mongoose.Schema({
  username: {
    type: String, 
    unique: true,
    required: [true, "username is required"],
  },
  email: {
    type: String,
    unique: true,
    required: [true, "email is required"],
  },
  password: {
    type: String,
    required: [true, "password is required"],
  },
  bio: String,
  profileImage: {
    type: String,
    default:
      "https://ik.imagekit.io/trn3x0gbv/FbnnL_0syfYRJQPWwXCn71XDzJApxCsxc-6mh5LIESg.webp",
  },
}, { timestamps: true }); 

const usermodel = mongoose.model("users", userSchema);

module.exports = usermodel;