const paySlipController = require("../controller/paySlipController");

const router =require("express").Router();

//Tạo bảng lương
router.post ("/:id",paySlipController.calculationPaySlip);
//Kế toán kiểm tra và duyệt
router.put ("/accountantCheck",paySlipController.accountantCheck);
//Giám đốc kiểm tra và duyệt
router.put ("/directorCheck",paySlipController.directorCheck);

//Tính toán lại bảng lương
router.put ("/recalculate/:id",paySlipController.recalculateAEmploy);



//Xem 1 bảng lương
router.get ("/:id",paySlipController.getApaySlip);

module.exports =router;