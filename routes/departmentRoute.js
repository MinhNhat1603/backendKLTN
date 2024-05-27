const departmentController = require("../controller/departmentController");
const authController = require("../controller/authController")
const router =require("express").Router();

//ADD A Department
router.post ("/", authController.veryfyAdmin, departmentController.add);

//GET ALL Department
router.get("/branch/:id", authController.veryfyAdmin, departmentController.getAll);

//GET A Department
router.get("/:id", authController.veryfyAdmin, departmentController.getOne);

//UPDATE Department
router.put("/:id", authController.veryfyAdmin, departmentController.update);

//So nhan vien trong phong
router.get("/countEmploy/:id", authController.veryfyAdmin, departmentController.countEmployIn);

//Danh sách nhan vien trong phong
router.get("/employ/:id", authController.veryfyAdmin, departmentController.employIn);



module.exports =router;