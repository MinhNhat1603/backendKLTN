const insuranceController = require("../controller/isuranceController");
const authController = require("../controller/authController")
const router =require("express").Router();

//ADD A contract
router.post ("/:id", authController.veryfyAdmin, insuranceController.addInsurance);

//GET ALL contract
router.get("/", authController.veryfyAdmin, insuranceController.getAllInsurance);

//GET ALL contract in month
router.get("/inMonth", authController.veryfyAdmin, insuranceController.getAllInsuranceInMonth );

//GET A contract
router.get("/:id", authController.veryfyEmploy, insuranceController.getAInsurance);

//UPDATE contract
router.put("/:id", authController.veryfyAdmin, insuranceController.updateInsurance);

//employ has insurance
router.get("/employ/:id", authController.veryfyEmploy, insuranceController.employHasInsuran);

module.exports =router;