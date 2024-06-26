const advanceRq = require("../models/advanceRqModel");
const branch = require("../models/branchesModel");
const employee = require("../models/employeesModel");

const advanceRqController = {
    //ADD advanceRq
    addAdvanceRq: async (req, res) => {
        try {
            req.body.employee = req.user;
            const newAdvanceRq = new advanceRq(req.body);
            const saveAdvanceRq = await newAdvanceRq.save();
            return res.status(200).json(saveAdvanceRq);
        } catch (error) {
            return res.status(500).json(error);
        }
    },
    //GET ALL advanceRq
    getAllAdvanceRq: async (req, res) => {
        try {
            const allAdvanceRq = await advanceRq.find();
            const employeeIn = await employInRole(req.user);
            const AdvanceRqInRole = await filterRole(allAdvanceRq, employeeIn);

            return res.status(200).json(AdvanceRqInRole);
        } catch (error) {
            return res.status(500).json(error);
        }
    },
    //GET A advanceRq
    getAdvanceRq: async (req, res) => {
        try {
            const AdvanceRq = await advanceRq.findById(req.params.id);
            if(req.user == AdvanceRq.employee || req.role =="admin"){
                return res.status(200).json(AdvanceRq);
            }else {
                return res.status(403).json("You do not have permission");
            }
        } catch (error) {
            return res.status(500).json(error);
        }
    },

    //UPDATE advanceRq
    updateAdvanceRq: async (req, res) => {
        try {
            const AdvanceRq = await advanceRq.findById(req.params.id)
            delete req.body.status;
            delete req.body.employee;
            if(req.user == AdvanceRq.employee || req.role =="admin"){
                await AdvanceRq.updateOne({ $set: req.body });
                return res.status(200).json("Update successfully!");
            }else {
                return res.status(403).json("You do not have permission");
            }
        } catch (error) {
            return res.status(500).json(error);
        }
    },

    approvalAdvanceRq: async (req, res) => {
        try {
            const employeeIn = await employInRole(req.user);
            const AdvanceRq = await advanceRq.findById(req.params.id);
            const exists = employeeIn.some(employee => employee.idEmployee === AdvanceRq.employee);
            if(exists){
                await AdvanceRq.updateOne({
                    status: req.body.status,
                    approvedUser: req.user
                });
                return res.status(200).json("Update successfully!");
            }else{
                return res.status(403).json("You do not have permission");
            }
            
        } catch (error) {
            return res.status(500).json(error);
        }
    },

    //Cac phiêu ứng tiên của nhân viên
    employHasAdvanceRq: async (req, res) => {
        try {  
            if(req.user == req.params.id || req.role =="admin"){
                const AdvanceRq = await advanceRq.find({ employee: req.params.id })
                return res.status(200).json(AdvanceRq);
            }else {
                return res.status(403).json("You do not have permission");
            }
        } catch (error) {
            return res.status(500).json(error);
        }
    },
};

module.exports = advanceRqController;

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

            