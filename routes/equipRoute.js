const equipController = require("../controller/equipController");

const router =require("express").Router();

//ADD A contract
router.post ("/", equipController.addEquip);

//GET ALL contract
router.get("/", equipController.getAllEquip);

//GET A contract
router.get("/:id",equipController.getAEquip);

//UPDATE contract
router.put("/:id",equipController.updateEquip);

//Nhan vien cos bao nhieu thiet bi
router.put("/employ/:id",equipController.employHasequip);

module.exports =router;