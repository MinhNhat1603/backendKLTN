const department = require("../models/departmentsModel");
const branch = require("../models/branchesModel");
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
            const branchALL = await branch.find();
            res.status(200).json(branchALL);
        } catch (error) {
            res.status(500).json(error);
        }
    },
     //GET A Branch
    getOne: async (req, res)=>{
        try {
            const aBranch = await branch.findOne({ idBranch: req.params.id});
            res.status(200).json(aBranch);
        } catch (error) {
            res.status(500).json(error);
        }
    },

    //UPDATE Branch
    update: async (req, res)=>{
        try {
            const aBranch = await branch.findOne({ idBranch: req.params.id});
            await aBranch.updateOne({$set: req.body});
            res.status(200).json("Update successfully!");
        } catch (error) {
            res.status(500).json(error);
        }
    },
};

module.exports = departmentController;
