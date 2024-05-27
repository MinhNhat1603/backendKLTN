const fs = require('fs');
const path = require('path');
const user = require("../models/usersModel");
const employee = require("../models/employeesModel");
const salaryDec = require("../models/salaryDecModel");
const contract = require("../models/contractsModel");

const salaryDecController = {
    //ADD salaryDec
    addSalaryDec: async (req,res) => {
        try {
            const newSalaryDec =new salaryDec(req.body);
            newSalaryDec.status = "Chưa đánh giá";          
            const saveSalaryDec = await newSalaryDec.save();
            res.status(200).json(saveSalaryDec);
        } catch (error) {
            res.status(500).json(error);
        }
    },
    //GET ALL salaryDec
    getAllSalaryDec: async (req,res) => {
        try {
            const allSalaryDec = await salaryDec.find();
            res.status(200).json(allSalaryDec);
        } catch (error) {
            res.status(500).json(error);
        }
    },
     //GET A salaryDec
    getASalaryDec: async (req, res)=>{
        try {
            const aSalaryDec =await salaryDec.findOne( {idSalaryDec: req.params.id})
            if(req.user == aSalaryDec.employee || req.user =="admin"){
                return res.status(200).json(aSalaryDec);
            }else {
                return res.status(403).json("You do not have permission");
            }
        } catch (error) {
            res.status(500).json(error);
        }
    },

    //UPDATE salaryDec
    updateSalaryDec: async (req, res)=>{
        try {
            const aSalaryDec =await salaryDec.findOne( {idSalaryDec: req.params.id})
            await aSalaryDec.updateOne({$set: req.body});
            res.status(200).json("Update successfully!");
        } catch (error) {
            res.status(500).json(error);
        }
    },

    //Đánh giá các tiêu chí tăng lương
    checkSalaryDec: async (req, res)=>{
        try {
            const aSalaryDec =await salaryDec.findOne( {idSalaryDec: req.params.id})
            await aSalaryDec.updateOne({status: "Đã kiểm tra"});
            res.status(200).json("Update successfully!");
        } catch (error) {
            res.status(500).json(error);
        }
    },
    // Giam đốc duyệt
    directorCheck:async (req, res)=>{
        try {
            const aSalaryDec =await salaryDec.findOne( {idSalaryDec: req.params.id})
            await aSalaryDec.updateOne({status: "Đã duyệt"});
            const aEmploy = await employee.findOne({ idEmployee: aSalaryDec.employee});
            await aEmploy.updateOne({
                salary: aSalaryDec.newSalary,
            });
            const aContract = await contract.findOne({ employee: aSalaryDec.employee});
            await aContract.updateOne({
                contractAddendum: aSalaryDec.idSalaryDec,
            });
            res.status(200).json("Update successfully!");
        } catch (error) {
            res.status(500).json(error);
        }
    },

    // tải mẫu phụ lục hợp đồng
    dowloadContractAddendum: async (req, res)=>{
        try {
            const filePath = path.join(__dirname, '../resource/PhuLucTangLuong.docx');
            const stat = fs.statSync(filePath);
            res.writeHead(200, {
                'Content-Type': 'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
                'Content-Length': stat.size,
                'Content-Disposition': 'attachment; filename=PhuLucTangLuong.docx',
            });
            
            const readStream = fs.createReadStream(filePath);
            readStream.pipe(res);
        } catch (error) {
            res.status(500).json(error);
        }
    },


    // Thêm phụ lục vào hợp đồng và cập nhập lương
    // addContractAddendum:async (req, res)=>{
    //     try {
    //         const aSalaryDec = await salaryDec.findOne( {idSalaryDec: req.params.id})
    //         await aSalaryDec.updateOne({status: "Đã duyệt"});
    //         const aEmploy = await employee.findOne({ idEmployee: aSalaryDec.employee});
    //         await aEmploy.updateOne({
    //             salary: aSalaryDec.newSalary,
    //         });
    //         const aContract = await contract.findOne({ employee: aSalaryDec.employee});
    //         await aContract.updateOne({
    //             contractAddendum: aSalaryDec.idSalaryDec,
    //         });
    //         res.status(200).json("Update successfully!");
    //     } catch (error) {
    //         res.status(500).json(error);
    //     }
    // },
    //Các quyết định tăng lương của nhân viên
    employHasSalaryDec: async (req, res)=>{
        try {
            if(req.user == req.params.id || req.user =="admin"){
                const aSalaryDec =await salaryDec.find( {employee: req.params.id})
                return res.status(200).json(aSalaryDec);
            }else {
                return res.status(403).json("You do not have permission");
            }
        } catch (error) {
            res.status(500).json(error);
        }
    },



    // //DELETE USER
    // deleteUser: async (req, res)=>{
    //     try {
    //         await user.findByIdAndDelete(req.params.id);
    //         res.status(200).json("Delete successfully!");
    //     } catch (error) {
    //         res.status(500).json(error);
    //     }
    // },
};

module.exports = salaryDecController;