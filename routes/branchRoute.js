const branchController = require("../controller/branchController");
const router =require("express").Router();

//ADD A branch
router.post ("/", branchController.addBranch);

//GET ALL branch
router.get("/", branchController.getAllBranch);

//GET A branch
router.get("/:id", branchController.getABranch);

//UPDATE branch
router.put("/:id", branchController.updateBranch);

module.exports =router;