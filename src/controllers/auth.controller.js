const usermodel = require("../models/user.model");
const crypto = require("crypto"); 
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs")




async function rigistercontroller (req, res){
  const { email, username, password, bio, profileImage } = req.body; 
  const userallreadexit = await usermodel.findOne({
    $or: [
      { username },
      { email },
    ],
  }); 
  if (userallreadexit) {
   
    return res.status(409).json({
      message: "user alrady exist ",
    });
  }
  const hash = await  bcrypt.hash(password,10);
  const user = await usermodel.create({
    username,
    email,
    bio,
    profileImage,
    password: hash,
  }); 

  const token = jwt.sign(
    {
      id: user._id,
    },
    process.env.JWT_SECRET,
    { expiresIn: "1d" },
  ); 
  res.cookie("token", token);

  res.status(201).json({
    user: {
      email: user.email,
      username: user.username,
      bio: user.bio,
      profileImage: user.profileImage,
    },
  });
}






async function logincontroller (req, res){
  const { username, email, password } = req.body;
  const user = await usermodel.findOne({
    $or: [{ username }, { email }],
  });
  if (!user) {
    return res.status(404).json([{ message: "user not found " }]);
  }
  

  const ispasswordvalid = await bcrypt.compare(password,user.password);

  if (!ispasswordvalid) {
    return res.status(401).json({
      message: "password is not correct ",
    });
  }

  const token = jwt.sign(
    {
      id: user._id,
    },
    process.env.JWT_SECRET,
    { expiresIn: "1d" },  
  );

  res.cookie("token", token);

  res.status(200).json({
    message: "user login",
    user: {
      username: user.username,
      email: user.email,
      bio: user.bio,
      profileImage: user.profileImage,
    },
  });
}





module.exports = {
    rigistercontroller,
    logincontroller
}