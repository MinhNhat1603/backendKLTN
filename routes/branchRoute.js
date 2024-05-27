const branchController = require("../controller/branchController");
const authController = require("../controller/authController")
const router =require("express").Router();

//ADD A branch
router.post ("/", authController.veryfyAdmin, branchController.addBranch);

//GET ALL branch
router.get("/", authController.veryfyAdmin, branchController.getAllBranch);

//GET A branch
router.get("/:id", authController.veryfyAdmin, branchController.getABranch);

//UPDATE branch
router.put("/:id", authController.veryfyAdmin, branchController.updateBranch);

//Count employ in Branch
router.get("/countEmploy/:id", authController.veryfyAdmin, branchController.countEmployIn);

// employ in Branch
router.get("/employ/:id", authController.veryfyAdmin, branchController.employIn);
module.exports =router;