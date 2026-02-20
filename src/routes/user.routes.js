const express = require("express")
const usercontroller = require("../controllers/user.controller")
const identifyuser = require("../middlewares/auth.middleware")


const userrouter = express.Router();



//localhost:3000/api/users/follow/1234567890
userrouter.post("/follow/:username",identifyuser,usercontroller.followusercontroller)



module.exports = userrouter ; 