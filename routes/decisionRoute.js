const decisionController = require("../controller/decisionController");
const authController = require("../controller/authController")
const router =require("express").Router();

//ADD A contract
router.post ("/", authController.veryfyAdmin, decisionController.addDecision);

//GET ALL contract
router.get("/", authController.veryfyAdmin, decisionController.getAllDecision);

//GET A contract
router.get("/:id", authController.veryfyEmploy, decisionController.getADecision);

//UPDATE contract
router.put("/:id", authController.veryfyAdmin, decisionController.updateDecision);

//Employ has
router.get("/employ/:id", authController.veryfyEmploy, decisionController.employHasDecision);

module.exports =router;