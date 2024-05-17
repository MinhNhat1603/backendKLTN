const position = require("../models/positionsModel");
const employee = require("../models/employeesModel");
const positionController = {
    //ADD position
    addPosition: async (req,res) => {
        try {
            const newPosition =new position(req.body);
            const savePosition = await newPosition.save();
            res.status(200).json(savePosition);
        } catch (error) {
            res.status(500).json(error);
        }
    },
    //GET ALL position
    getAllPosition: async (req,res) => {
        try {
            const allPosition = await position.find();
            res.status(200).json(allPosition);
        } catch (error) {
            res.status(500).json(error);
        }
    },
     //GET A position
    getAPosition: async (req, res)=>{
        try {
            const aPosition =await position.findOne(req.params.id);
            res.status(200).json(aPosition);
        } catch (error) {
            res.status(500).json(error);
        }
    },

    //UPDATE position
    updateUser: async (req, res)=>{
        try {
            const aPosition=await position.findOne(req.params.id);
            await aPosition.updateOne({$set: req.body});
            res.status(200).json("Update successfully!");
        } catch (error) {
            res.status(500).json(error);
        }
    },

    //Số nhân viên co chuc vu
    countEmployOf:  async (req, res)=>{
        try {
            const Numberof =await employee.countDocuments({position : req.params.id});
            res.status(200).json(Numberof);
        } catch (error) {
            res.status(500).json(error);
        }
    },
    
    employOf: async (req, res)=>{
        try {
            const Numberof =await employee.find({position : req.params.id});
            res.status(200).json(Numberof);
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

module.exports = positionController;