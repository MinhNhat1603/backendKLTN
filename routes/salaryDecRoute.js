const salaryDecController = require("../controller/salaryDecController");
const router =require("express").Router();

//ADD A position
router.post ("/", salaryDecController.addSalaryDec);

//GET ALL position
router.get("/", salaryDecController.getAllSalaryDec);

//GET A position
router.get("/:id",salaryDecController.getASalaryDec);

//UPDATE position
router.put("/:id",salaryDecController.updateSalaryDec);

//Cac queyt dinh tang giam luong cua nhan viene
router.put("/employ/:id",salaryDecController.employHasSalaryDec);

//download mãu phụ lục tăng lương.
router.get("/download", salaryDecController.dowloadContractAddendum);

module.exports =router;