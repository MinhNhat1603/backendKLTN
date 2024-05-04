const departmentController = require("../controller/departmentController");
const router =require("express").Router();

//ADD A Department
router.post ("/", departmentController.add);

//GET ALL Department
router.get("/", departmentController.getAll);

//GET A Department
router.get("/:id", departmentController.getOne);

//UPDATE Department
router.put("/:id", departmentController.update);

//So nhan vien trong phong
router.put("/:id", departmentController.employIn);

module.exports =router;