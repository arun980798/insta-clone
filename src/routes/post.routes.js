const express = require("express")
const postrouter = express.Router();
const postcontroller = require("../controllers/post.controllers")
const multer = require("multer")
const uplode = multer({storage:multer.memoryStorage()})
const identifyuser = require("../middlewares/auth.middleware")


postrouter.post("/",uplode.single("imgurl"),identifyuser,postcontroller.createpostcontroller)


// user request kare or usko uske sare post mil jye 

postrouter.get("/" ,identifyuser,postcontroller.getpostcontroller)

postrouter.get("/details/:postid" ,identifyuser ,postcontroller.getpostdetailscontroller)

module.exports = postrouter ; 