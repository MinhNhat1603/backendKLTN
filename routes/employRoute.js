const employController = require("../controller/employController");
const authController = require("../controller/authController")
const router =require("express").Router();

//ADD A employ
router.post ("/", authController.veryfyAdmin, employController.addEmploy);

//GET ALL employ
router.get("/", authController.veryfyAdmin, employController.getAllEmploy);

//GET A employ
router.get("/:id", authController.veryfyEmploy, employController.getAEmploy);

//UPDATE USER
router.put("/:id", authController.veryfyEmploy, employController.updateEmploy);

//Employ đạt yêu câu khi thử vệc
router.put("/acheieved/:id", authController.veryfyAdmin, employController.employAcheieved);

//Employ không đạt yêu câu khi thử vệc
router.put("/notAcheieved/:id", authController.veryfyAdmin, employController.employNotAchieved);

//ADD  employs from json
router.post ("/json", authController.veryfyAdmin, employController.excelAddNewEmploy);

// //Danh sach nhan vien dang thu viec
// router.get("/trial", authController.veryfyAdmin, employController.trialEmploy);

module.exports =router;
