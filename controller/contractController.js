const employee = require("../models/employeesModel");
const contract = require("../models/contractsModel");
const branch = require("../models/branchesModel");

const contractController = {
    //ADD contract
    addContract: async (req,res) => {
        try {
            const newContract =new contract(req.body);
            const employeeIn = await employInRole(req.user);
            const exists = employeeIn.some(employee => employee.idEmployee === newContract.employee);

            if(exists){
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
            }else{
                return res.status(403).json("You do not have permission");
            }

            
        } catch (error) {
            return res.status(500).json(error);
        }
    },
    //GET ALL contract
    getAllContract: async (req,res) => {
        try {
            const allContract = await contract.find();
            const employeeIn = await employInRole(req.user);
            const contractInRole = await filterRole(allContract, employeeIn);
            return res.status(200).json(contractInRole);
        } catch (error) {
            return res.status(500).json(error);
        }
    },
     //GET A contract
    getAContract: async (req, res)=>{
        try {
            const aContract =await contract.findOne( {idContract: req.params.id})
            if(req.user == aContract.employee || req.role =="admin"){
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
            if(req.user == req.params.id || req.role =="admin"){
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

async function employInRole(user) {
    if( user == "admin"){
        const employALL = await employee.find()
        return employALL;
    }
    const aBranch = await branch.findOne({ idBranch: user});
    if (!aBranch) {
        return "not found";
    }
    var elpoyeeIn =[];
    for (let i = 0; i < aBranch.departments.length; i++){
        employs = await employee.find({department : aBranch.departments[i]});
        elpoyeeIn = elpoyeeIn.concat(employs);
    }
    return elpoyeeIn;
}

async function filterRole(all, employeeIn) {
    const IDemployeeIn = employeeIn.map(employee => employee.idEmployee);
    const afilterRole = all.filter(object=>
        IDemployeeIn.includes(object.employee)
    );
    return afilterRole;
}