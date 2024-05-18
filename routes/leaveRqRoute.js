const leaveRqController = require("../controller/leaveRqController");
const router =require("express").Router();

//ADD A contract
router.post ("/", leaveRqController.addLeaveRq);

//GET ALL contract
router.get("/", leaveRqController.getAllLeaveRq);

//GET A contract
router.get("/:id",leaveRqController.getALeaveRq);

//UPDATE contract
router.put("/:id",leaveRqController.updateLeaveRq);

//Cac don xin nghi cua nhan viene
router.get("/employ/:id",leaveRqController.employHasLeaveRq);

module.exports =router;