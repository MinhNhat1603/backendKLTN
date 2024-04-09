const userController = require("../controller/userController");
const router =require("express").Router();

//ADD A USER
router.post ("/", userController.addUser);

//GET ALL USER
router.get("/", userController.getAllUser);

//GET A USER
router.get("/:id",userController.getAUser);

//UPDATE USER
router.put("/:id",userController.updateUser);

module.exports =router;