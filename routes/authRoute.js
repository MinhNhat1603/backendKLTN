const authController = require("../controller/authController");

const router =require("express").Router();

//LOGIN
router.post ("/login",authController.loginUser);
//LOGOUT
router.post ("/logout",authController.logoutUser);

//veryfy
router.get ("/veryfy",authController.veryfyToken);

module.exports =router;