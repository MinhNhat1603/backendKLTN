const employController = require("../controller/employController");
const router =require("express").Router();

//ADD A employ
router.post ("/", employController.addEmploy);

//GET ALL employ
router.get("/", employController.getAllEmploy);

//GET A employ
router.get("/:id", employController.getAEmploy);

//UPDATE USER
router.put("/:id", employController.updateEmploy);

//Employ đạt yêu câu khi thử vệc
router.put("/acheieved/:id", employController.employAcheieved);

//Employ không đạt yêu câu khi thử vệc
router.put("/notAcheieved/:id", employController.employNotAchieved);

//template
router.get("/template", employController.templateAddNewEmploy);

//ADD  employs from json
router.post ("/json", employController.excelAddNewEmploy);

//Danh sach nhan vien dang thu viec
router.get("/trial", employController.trialEmploy);

module.exports =router;
