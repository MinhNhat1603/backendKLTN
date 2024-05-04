const advanceRqController = require("../controller/advanceRqController");
const router =require("express").Router();

//ADD A contract
router.post ("/", advanceRqController.addAdvanceRq);

//GET ALL contract
router.get("/", advanceRqController.getAllAdvanceRq);

//GET A contract
router.get("/:id",advanceRqController.getAdvanceRq);

//UPDATE contract
router.put("/:id",advanceRqController.updateAdvanceRq);

//employ has
router.put("/employ/:id",advanceRqController.employHasAdvanceRq);

module.exports =router;