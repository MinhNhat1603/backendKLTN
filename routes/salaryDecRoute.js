const salaryDecController = require("../controller/salaryDecController");
const authController = require("../controller/authController")
const router =require("express").Router();

//ADD A position
router.post ("/", authController.veryfyAdmin, salaryDecController.addSalaryDec);

//GET ALL position
router.get("/getAll", authController.veryfyAdmin, salaryDecController.getAllSalaryDec);

//GET A position
router.get("/:id", authController.veryfyEmploy, salaryDecController.getASalaryDec);

//UPDATE position
router.put("/:id", authController.veryfyAdmin,salaryDecController.updateSalaryDec);

//Cac queyt dinh tang giam luong cua nhan viene
router.get("/employ/:id", authController.veryfyEmploy,salaryDecController.employHasSalaryDec);

//download mãu phụ lục tăng lương.
router.get("/", salaryDecController.dowloadContractAddendum);

//Đánh giá kiểm tra tiêu chí tăng lương
router.put("/check/:id", authController.veryfyAdmin,salaryDecController.checkSalaryDec);

//Giám đốc duyệt
router.put("/director/:id", authController.veryfyAdmin,salaryDecController.directorCheck);

module.exports =router;