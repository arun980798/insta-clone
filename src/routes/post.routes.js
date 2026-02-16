const express = require("express")
const postrouter = express.Router();
const postcontroller = require("../controllers/post.controllers")
const multer = require("multer")
const uplode = multer({storage:multer.memoryStorage()})



postrouter.post("/",uplode.single("imgurl"),postcontroller.createpostcontroller)


// user request kare or usko uske sare post mil jye 

postrouter.get("/",postcontroller.getpostcontroller)

postrouter.get("/details/:postid",postcontroller.getpostdetailscontroller)

module.exports = postrouter ; 