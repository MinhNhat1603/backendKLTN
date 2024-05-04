const decisionController = require("../controller/decisionController");
const router =require("express").Router();

//ADD A contract
router.post ("/", decisionController.addDecision);

//GET ALL contract
router.get("/", decisionController.getAllDecision);

//GET A contract
router.get("/:id",decisionController.getADecision);

//UPDATE contract
router.put("/:id",decisionController.updateDecision);

//Employ has
router.get("/employ/:id",decisionController.employHasDecision);

module.exports =router;