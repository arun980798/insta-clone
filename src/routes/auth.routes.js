//isme sare auh relatd api hogi

const express = require("express"); 
const authcontroller = require("../controllers/auth.controller")
const authrouter = express.Router(); 

authrouter.post("/rigister", authcontroller.rigistercontroller); 

authrouter.post("/login", authcontroller.logincontroller);

module.exports = authrouter;
