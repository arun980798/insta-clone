const express = require("express")
const postrouter = express.Router();
const postcontroller = require("../controllers/post.controllers")
const multer = require("multer")
const uplode = multer({storage:multer.memoryStorage()})



postrouter.post("/",uplode.single("imgurl"),postcontroller.createpostcontroller)


module.exports = postrouter ; 