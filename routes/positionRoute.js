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

//Nhan vien co chuc vu
router.put("/employ/:id",positonController.employOf);

module.exports =router;