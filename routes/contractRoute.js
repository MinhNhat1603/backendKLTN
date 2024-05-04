const contractController = require("../controller/contractController");
const router =require("express").Router();

//ADD A contract
router.post ("/", contractController.addContract);

//GET ALL contract
router.get("/", contractController.getAllContract);

//GET A contract
router.get("/:id",contractController.getAContract);

//UPDATE contract
router.put("/:id",contractController.updateContract);

//
router.get("/employ/:id",contractController.employHasContract);
module.exports =router;