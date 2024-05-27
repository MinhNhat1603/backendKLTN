const advanceRqController = require("../controller/advanceRqController");
const authController = require("../controller/authController")
const router =require("express").Router();

//ADD A advance
router.post ("/", authController.veryfyEmploy, advanceRqController.addAdvanceRq);

//GET ALL advance
router.get("/", authController.veryfyAdmin, advanceRqController.getAllAdvanceRq);

//GET A advance
router.get("/:id", authController.veryfyEmploy, advanceRqController.getAdvanceRq);

//UPDATE advance
router.put("/:id", authController.veryfyEmploy, advanceRqController.updateAdvanceRq);

//employ has advance
router.get("/employ/:id", authController.veryfyEmploy, advanceRqController.employHasAdvanceRq);

//xét duỵet đơn xin ứng tiền
router.put("/approval/:id", authController.veryfyAdmin, advanceRqController.approvalAdvanceRq);

module.exports =router;