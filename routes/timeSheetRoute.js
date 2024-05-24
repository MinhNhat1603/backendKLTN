const timeSheetController = require("../controller/timeSheetController");
const router =require("express").Router();


router.post("/checkIn/:id", timeSheetController.fakecheckeIn);

router.put("/checkOut/:id", timeSheetController.checkOut);

router.put("/update", timeSheetController.updateTimeSheet);

router.get("/getA", timeSheetController.getAtimeSheet);

router.get("/timeSheetInMonth", timeSheetController.getTimeSheetInMonth);

router.post("/add", timeSheetController.getAtimeSheet);

router.delete("/delete", timeSheetController.getAtimeSheet);



module.exports =router;