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
            return res.status(200).json(saveInsurance);
        } catch (error) {
            return res.status(500).json(error);
        }
    },
    //GET ALL Insurance
    getAllInsurance: async (req,res) => {
        try {
            const allInsurance = await insurance.find();
            return res.status(200).json(allInsurance);
        } catch (error) {
            return res.status(500).json(error);
        }
    },
    //GET ALL Insurance
    getAllInsuranceInMonth: async (req,res) => {
        try {
            const allInsurance = await insurance.find({
                year: req.body.year,
                month: req.body.month
            });
            return res.status(200).json(allInsurance);
        } catch (error) {
            return res.status(500).json(error);
        }
    },
     //GET A Insurance
    getAInsurance: async (req, res)=>{
        try {
            const aInsurance =await insurance.findById( req.params.id)
            if(req.user == aInsurance.employee || req.user =="admin"){
                return res.status(200).json(aInsurance);
            }else {
                return res.status(403).json("You do not have permission");
            }
        } catch (error) {
            return res.status(500).json(error);
        }
    },

    //UPDATE Insurance
    updateInsurance: async (req, res)=>{
        try {
            const aInsurance =await insurance.findOne( {idInsurance: req.params.id})
            await aInsurance.updateOne({$set: req.body});
            return res.status(200).json("Update successfully!");
        } catch (error) {
            return res.status(500).json(error);
        }
    },
    employHasInsuran:async (req,res) => {
        try {
            if(req.user == req.params.id || req.user =="admin"){
                const insurances = await insurance.find({
                    employee: req.params.id
                });
                return res.status(200).json(insurances);
            }else {
                return res.status(403).json("You do not have permission");
            }
        } catch (error) {
            return res.status(500).json(error);
        }
    },
};

module.exports = insuranceController;