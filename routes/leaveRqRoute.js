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

//Cac don xin nhi cua nhan viene
router.put("/:id",leaveRqController.employHasLeaveRq);

module.exports =router;