const mongoose = require("mongoose"); //require mongoose

const userSchema = new mongoose.Schema({
  username: {
    type: String,  // ← Fixed: lowercase "type"
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
}, { timestamps: true }); // Optional: adds createdAt and updatedAt

const usermodel = mongoose.model("users", userSchema);

module.exports = usermodel;