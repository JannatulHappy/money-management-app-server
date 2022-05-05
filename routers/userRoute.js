// router is the way to communicate user with database

const router = require("express").Router(); //router is a method.u need call it

const {login,register}=require('../controller/userController')

router.post("/register",register)//here u need pass two things,1..path name2.callback function(middleware)we wil call it a controller.we will make this controller on other file.u need to use this route in server.js

router.post("/login",login)


module.exports = router;
