const insuranceController = require("../controller/isuranceController");
const router =require("express").Router();

//ADD A contract
router.post ("/:id", insuranceController.addInsurance);

//GET ALL contract
router.get("/", insuranceController.getAllInsurance);

//GET A contract
router.get("/:id",insuranceController.getAInsurance);

//UPDATE contract
router.put("/:id",insuranceController.updateInsurance);

module.exports =router;