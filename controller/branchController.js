const branch = require("../models/branchesModel");
const branchController = {
    //ADD  Branch
    addBranch: async (req,res) => {
        try {
            const newBranch =new branch(req.body);
            const saveBranch = await newBranch.save();
            res.status(200).json(saveBranch);
        } catch (error) {
            res.status(500).json(error);
        }
    },
    //GET ALL Branch
    getAllBranch: async (req,res) => {
        try {
            const branchALL = await branch.find();
            res.status(200).json(branchALL);
        } catch (error) {
            res.status(500).json(error);
        }
    },
     //GET A Branch
    getABranch: async (req, res)=>{
        try {
            const aBranch = await branch.findOne({ idBranch: req.params.id});
            res.status(200).json(aBranch);
        } catch (error) {
            res.status(500).json(error);
        }
    },

    //UPDATE Branch
    updateBranch: async (req, res)=>{
        try {
            const aBranch = await branch.findOne({ idBranch: req.params.id});
            await aBranch.updateOne({$set: req.body});
            res.status(200).json("Update successfully!");
        } catch (error) {
            res.status(500).json(error);
        }
    },
};

module.exports = branchController;
