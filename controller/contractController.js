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
            return res.status(200).json(aContract);
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
            const Contract =await contract.find( {employee: req.params.id})
            return res.status(200).json(Contract);
        } catch (error) {
            return res.status(500).json(error);
        }
    },

    // //DELETE USER
    // deleteUser: async (req, res)=>{
    //     try {
    //         await user.findByIdAndDelete(req.params.id);
    //         return res.status(200).json("Delete successfully!");
    //     } catch (error) {
    //         return res.status(500).json(error);
    //     }
    // },
};

module.exports = contractController;