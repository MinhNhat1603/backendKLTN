const paySlipController = require("../controller/paySlipController");
const authController = require("../controller/authController")
const router =require("express").Router();

//Tạo bảng lương chôo chi nhánh
router.post ("/:id", authController.veryfyAdmin,paySlipController.calculationPaySlip);
//Tạo bảng lương cho 1 nhân viên
router.post ("/employ/:id", authController.veryfyAdmin,paySlipController.calculationAPaySlip);
//Kế toán kiểm tra và duyệt
router.put ("/accountantCheck", authController.veryfyAdmin, paySlipController.accountantCheck);
//Giám đốc kiểm tra và duyệt
router.put ("/directorCheck", authController.veryfyAdmin, paySlipController.directorCheck);

//Xem 1 bảng lương
router.get ("/:id", authController.veryfyEmploy,paySlipController.getApaySlip);
//Xem các bảng lương của môt nhân viên
router.get ("/employ/:id", authController.veryfyEmploy,paySlipController.employHasPaySlip);

//Tai bang luong
router.get ("/", authController.veryfyAdmin, paySlipController.dowloadExcelPaySlip);
module.exports =router;