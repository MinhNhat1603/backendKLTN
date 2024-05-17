const department = require("../models/departmentsModel");
const branch = require("../models/branchesModel");
const employee = require("../models/employeesModel");
const departmentController = {
    //ADD  Branch
    add: async (req,res) => {
        try {
            const newDepart =new department(req.body);
            const saveDepart = await newDepart.save();
            if(req.body.branch){
                const abranch = await branch.findOne({ idBranch: saveDepart.branch});
                await abranch.updateOne({$push: {departments: saveDepart.idDepartment}})
            }
            res.status(200).json(saveDepart);
        } catch (error) {
            res.status(500).json(error);
        }
    },
    //GET ALL Branch
    getAll: async (req,res) => {
        try {
            const departmentAll = await department.find();
            res.status(200).json(departmentAll);
        } catch (error) {
            res.status(500).json(error);
        }
    },
     //GET A Branch
    getOne: async (req, res)=>{
        try {
            const aDepartment = await department.findOne({ idDepartment: req.params.id});
            res.status(200).json(aDepartment);
        } catch (error) {
            res.status(500).json(error);
        }
    },

    //UPDATE Branch
    update: async (req, res)=>{
        try {
            const aDepartment = await department.findOne({ idDepartment: req.params.id});
            await aDepartment.updateOne({$set: req.body});
            res.status(200).json("Update successfully!");
        } catch (error) {
            res.status(500).json(error);
        }
    },

    //Số Nhan vien trong phong
    countEmployIn:  async (req, res)=>{
        try {
            const NumberIn =await employee.countDocuments({department : req.params.id});
            res.status(200).json(NumberIn);
        } catch (error) {
            res.status(500).json(error);
        }
    },

    //Danh sách nhân viên trong phong
    employIn:  async (req, res)=>{
        try {
            const employ =await employee.find({department : req.params.id});
            res.status(200).json(employ);
        } catch (error) {
            res.status(500).json(error);
        }
    },
};

module.exports = departmentController;
