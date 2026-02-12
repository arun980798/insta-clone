const usermodel = require("../models/user.model"); //take user module to add new user to the db
const crypto = require("crypto"); // ye package pass ko hash karne ke kam ata h
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs")




async function rigistercontroller (req, res){
  const { email, username, password, bio, profileImage } = req.body; //ye sara data user clint side se ayega or req.body me ayega vahe se milega
  const userallreadexit = await usermodel.findOne({
    $or: [
      // ye or opratior h ye andar deya hua data h usme se 1 be milta h to usko phele de ke khatam karega koi be 1 condition true hue to bhar true kar dega
      { username },
      { email },
    ],
  }); // go to db and check is user exist or not by email or username any one
  if (userallreadexit) {
    // run if  is user exit true
    return res.status(409).json({
      message: "user alrady exist ",
    });
  }
  //ye data nakal ke leke ayega or userexist me jake  dal dega
  const hash = await  bcrypt.hash(password,10); //normal pass ko  1 vaiable me save karenge in hash form hash pass me save karenge

  const user = await usermodel.create({
    username,
    email,
    bio,
    profileImage,
    password: hash,
  }); //1 user model create hua h

  const token = jwt.sign(
    {
      id: user._id,
    },
    process.env.JWT_SECRET,
    { expiresIn: "1d" },
  ); //token banane ke leye requirement data user ka ho or unique ho or jwt token banata h
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