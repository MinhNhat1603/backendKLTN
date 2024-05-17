const positonController = require("../controller/positionController");
const router =require("express").Router();

//ADD A position
router.post ("/", positonController.addPosition);

//GET ALL position
router.get("/", positonController.getAllPosition);

//GET A position
router.get("/:id",positonController.getAPosition);

//UPDATE position
router.put("/:id",positonController.updateUser);

//Danh sach Nhan vien co chuc vu
router.put("/employ/:id",positonController.employOf);

//Số Nhan vien co chuc vu
router.put("/countEmploy/:id",positonController.countEmployOf);

module.exports =router;