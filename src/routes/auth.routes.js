//isme sare auh relatd api hogi

const express = require("express"); // require express fr server
const authcontroller = require("../controllers/auth.controller")
const authrouter = express.Router(); // ye route banata h

authrouter.post("/rigister", authcontroller.rigistercontroller); //this is use to regestetr the user or make the new user

authrouter.post("/login", authcontroller.logincontroller);

module.exports = authrouter;
