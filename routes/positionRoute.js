const positonController = require("../controller/positionController");
const authController = require("../controller/authController")
const router =require("express").Router();

//ADD A position
router.post ("/", authController.veryfyAdmin, positonController.addPosition);

//GET ALL position
router.get("/", authController.veryfyAdmin, positonController.getAllPosition);

//GET A position
router.get("/:id", authController.veryfyAdmin, positonController.getAPosition);

//UPDATE position
router.put("/:id", authController.veryfyAdmin, positonController.updateUser);

//Danh sach Nhan vien co chuc vu
router.put("/employ/:id", authController.veryfyAdmin, positonController.employOf);

//Số Nhan vien co chuc vu
router.put("/countEmploy/:id", authController.veryfyAdmin, positonController.countEmployOf);

module.exports =router;