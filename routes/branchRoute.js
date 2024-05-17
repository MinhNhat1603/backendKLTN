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

//Count employ in Branch
router.get("/countEmploy/:id", branchController.countEmployIn);

// employ in Branch
router.get("/employ/:id", branchController.employIn);
module.exports =router;