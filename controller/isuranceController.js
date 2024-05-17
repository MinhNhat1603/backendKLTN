const user = require("../models/usersModel");
const employee = require("../models/employeesModel");
const insurance = require("../models/insuranceModel");
const insuranceController = {
    //ADD Insurance
    addInsurance: async (req,res) => {
        try {
            const employ = await employee.findOne({idEmployee: req.params.id})
            const companyPay = employ.salary / 100 * 21.5;
            const employeePay = employ.salary / 100 * 10.5

            const acurrentDate = new Date();
            const year = acurrentDate.getFullYear();
            const month = acurrentDate.getMonth() + 1;

            const newInsurance =new insurance({
                employee : employ.idEmployee,
                isuranceCode: employ.insuranceCode,
                salaryInsurance: employ.salary,
                companyPay: companyPay,
                employeePay: employeePay,
                year: year,
                month: month,
                status: "Chưa xác nhận"
            });
            const saveInsurance = await newInsurance.save();
            res.status(200).json(saveInsurance);
        } catch (error) {
            res.status(500).json(error);
        }
    },
    //GET ALL Insurance
    getAllInsurance: async (req,res) => {
        try {
            const allInsurance = await insurance.find();
            res.status(200).json(allInsurance);
        } catch (error) {
            res.status(500).json(error);
        }
    },
     //GET A Insurance
    getAInsurance: async (req, res)=>{
        try {
            const aInsurance =await insurance.findOne( {idInsurance: req.params.id})
            res.status(200).json(aInsurance);
        } catch (error) {
            res.status(500).json(error);
        }
    },

    //UPDATE Insurance
    updateInsurance: async (req, res)=>{
        try {
            const aInsurance =await insurance.findOne( {idInsurance: req.params.id})
            await aInsurance.updateOne({$set: req.body});
            res.status(200).json("Update successfully!");
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

module.exports = insuranceController;