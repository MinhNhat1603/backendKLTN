const userController = require("../controller/userController");
const authController = require("../controller/authController")
const router =require("express").Router();

//ADD A USER
router.post ("/:id", authController.veryfyAdmin, userController.addUser);

//GET ALL USER
router.get("/", authController.veryfyAdmin, userController.getAllUser);

//GET A USER
router.get("/:id", authController.veryfyAdmin,userController.getAUser);

//UPDATE USER
router.put("/:id", authController.veryfyAdmin,userController.updateUser);

//change Password
router.put("/password/:id", authController.veryfyEmploy,userController.changePassword);

module.exports =router;