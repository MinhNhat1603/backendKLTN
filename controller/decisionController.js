const decision = require("../models/decisionModel");
const branch = require("../models/branchesModel");
const employee = require("../models/employeesModel");

const decisionController = {
    //ADD decision
    addDecision: async (req,res) => {
        try {
            const newDecision =new decision(req.body);
            const employeeIn = await employInRole(req.user);
            const exists = employeeIn.some(employee => employee.idEmployee === newDecision.employee);
            if(exists){
                const saveDecision = await newDecision.save();
                return res.status(200).json(saveDecision);
            }else{
                return res.status(403).json("You do not have permission");
            }
        } catch (error) {
            return res.status(500).json(error);
        }
    },
    //GET ALL decision
    getAllDecision: async (req,res) => {
        try {
            const allDecision = await decision.find();
            const employeeIn = await employInRole(req.user);
            const decisionInRole = await filterRole(allDecision, employeeIn);
            return res.status(200).json(decisionInRole);
        } catch (error) {
            return res.status(500).json(error);
        }
    },
     //GET A decision
    getADecision: async (req, res)=>{
        try {
            const aDecision =await decision.findOne( {idDecision: req.params.id})
            if(req.user == aDecision.employee || req.role =="admin"){
                return  res.status(200).json(aDecision);
            }else {
                return  res.status(403).json("You do not have permission");
            }
        } catch (error) {
            return res.status(500).json(error);
        }
    },

    //UPDATE contract
    updateDecision: async (req, res)=>{
        try {
            const aDecision =await decision.findOne( {idDecision: req.params.id})
            await aDecision.updateOne({$set: req.body});
            return res.status(200).json("Update successfully!");
        } catch (error) {
            return res.status(500).json(error);
        }
    },

    //Các quyên định của nhân viên
    employHasDecision: async (req, res)=>{
        try {
            if(req.user == req.params.id || req.role =="admin"){
                const aDecision =await decision.find( {employee: req.params.id})
                return  res.status(200).json(aDecision);
            }else {
                return  res.status(403).json("You do not have permission");
            }
        } catch (error) {
            return res.status(500).json(error);
        }
    },
};

module.exports = decisionController;

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