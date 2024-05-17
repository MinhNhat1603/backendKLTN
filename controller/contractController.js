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
                res.status(400 ).json("Employ not found");
            }
            const saveContract = await newContract.save();
            await aEmploy.updateOne({
                status: "Đã kí hợp đồng",
                salary: newContract.basicSalary,
                contract: newContract.idContract
            });
            res.status(200).json(saveContract);
        } catch (error) {
            res.status(500).json(error);
        }
    },
    //GET ALL contract
    getAllContract: async (req,res) => {
        try {
            const allContract = await contract.find();
            res.status(200).json(allContract);
        } catch (error) {
            res.status(500).json(error);
        }
    },
     //GET A contract
    getAContract: async (req, res)=>{
        try {
            const aContract =await contract.findOne( {idContract: req.params.id})
            res.status(200).json(aContract);
        } catch (error) {
            res.status(500).json(error);
        }
    },

    //UPDATE contract
    updateContract: async (req, res)=>{
        try {
            const aContract =await contract.findOne( {idContract: req.params.id})
            await aContract.updateOne({$set: req.body});
            res.status(200).json("Update successfully!");
        } catch (error) {
            res.status(500).json(error);
        }
    },
    employHasContract:async (req, res)=>{
        try {
            const Contract =await contract.find( {employee: req.params.id})
            res.status(200).json(Contract);
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

module.exports = contractController;