const contractController = require("../controller/contractController");
const authController = require("../controller/authController")
const router =require("express").Router();

//ADD A contract
router.post ("/", authController.veryfyAdmin, contractController.addContract);

//GET ALL contract
router.get("/", authController.veryfyAdmin, contractController.getAllContract);

//GET A contract
router.get("/:id", authController.veryfyEmploy, contractController.getAContract);

//UPDATE contract
router.put("/:id", authController.veryfyAdmin, contractController.updateContract);

//Các hợp đồng nhân viên đã ký 
router.get("/employ/:id", authController.veryfyEmploy, contractController.employHasContract);


module.exports =router;