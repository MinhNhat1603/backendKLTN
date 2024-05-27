const leaveRqController = require("../controller/leaveRqController");
const authController = require("../controller/authController")
const router =require("express").Router();

//ADD A leaveRq
router.post ("/", authController.veryfyEmploy, leaveRqController.addLeaveRq);

//GET ALL leaveRq
router.get("/", authController.veryfyAdmin, leaveRqController.getAllLeaveRq);

//GET A leaveRq
router.get("/:id", authController.veryfyEmploy, leaveRqController.getALeaveRq);

//UPDATE leaveRq
router.put("/:id", authController.veryfyEmploy, leaveRqController.updateLeaveRq);

//Cac don xin nghi cua nhan viene
router.get("/employ/:id", authController.veryfyEmploy, leaveRqController.employHasLeaveRq);

module.exports =router;