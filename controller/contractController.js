const user = require("../models/usersModel");
const employee = require("../models/employeesModel");
const contract = require("../models/contractsModel");
const contractController = {
    //ADD contract
    addContract: async (req,res) => {
        try {
            const newContract =new contract(req.body);
            const aEmploy = await employee.findOne({ idEmployee: newContract.employee});
            if(aEmploy == null){
                return res.status(400 ).json("Employ not found");
            }
            if(aEmploy.status === "Đang thử việc/ đào tạo"){
                return res.status(400 ).json("Nhân viên chưa được tạo tài khoản")
            }
            const saveContract = await newContract.save();
            await aEmploy.updateOne({
                status: "Nhân viên hợp đồng",
                salary: newContract.basicSalary,
                contract: newContract.idContract,
                position: newContract.position
            });
            return res.status(200).json(saveContract);
        } catch (error) {
            return res.status(500).json(error);
        }
    },
    //GET ALL contract
    getAllContract: async (req,res) => {
        try {
            const allContract = await contract.find();
            return res.status(200).json(allContract);
        } catch (error) {
            return res.status(500).json(error);
        }
    },
     //GET A contract
    getAContract: async (req, res)=>{
        try {
            const aContract =await contract.findOne( {idContract: req.params.id})
            if(req.user == aContract.employee || req.user =="admin"){
                return res.status(200).json(aContract);
            }else {
                return res.status(403).json("You do not have permission");
            }
        } catch (error) {
            return res.status(500).json(error);
        }
    },

    //UPDATE contract
    updateContract: async (req, res)=>{
        try {
            const aContract =await contract.findOne( {idContract: req.params.id})
            await aContract.updateOne({$set: req.body});
            return res.status(200).json("Update successfully!");
        } catch (error) {
            return res.status(500).json(error);
        }
    },
    
    employHasContract:async (req, res)=>{
        try {
            if(req.user == req.params.id || req.user =="admin"){
                const Contract =await contract.find( {employee: req.params.id})
                return res.status(200).json(Contract);
            }else {
                return res.status(403).json("You do not have permission");
            }
        } catch (error) {
            return res.status(500).json(error);
        }
    },
};

module.exports = contractController;