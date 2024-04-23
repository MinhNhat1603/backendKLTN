const employController = require("../controller/employController");
const router =require("express").Router();

//ADD A employ
router.post ("/", employController.addEmploy);

//GET ALL employ
router.get("/", employController.getAllEmploy);

//GET A employ
router.get("/:id", employController.getAEmploy);

//UPDATE USER
router.put("/:id", employController.updateEmploy);

module.exports =router;
