const user = require("../models/usersModel");
const leaveRq = require("../models/leaveRqModel");
const leaveRqController = {
    //ADD leaveRq
    addLeaveRq: async (req,res) => {
        try {
            const newLeaveRq =new leaveRq(req.body);
            const saveLeaveRq = await newLeaveRq.save();
            res.status(200).json(saveLeaveRq);
        } catch (error) {
            res.status(500).json(error);
        }
    },
    //GET ALL leaveRq
    getAllLeaveRq: async (req,res) => {
        try {
            const allLeaveRq = await leaveRq.find();
            res.status(200).json(allLeaveRq);
        } catch (error) {
            res.status(500).json(error);
        }
    },
     //GET A leaveRq
    getALeaveRq: async (req, res)=>{
        try {
            const aLeaveRq =await leaveRq.findOne( {idLeaveRq: req.params.id})
            res.status(200).json(aLeaveRq);
        } catch (error) {
            res.status(500).json(error);
        }
    },

    //UPDATE leaveRq
    updateLeaveRq: async (req, res)=>{
        try {
            const aLeaveRq =await leaveRq.findOne( {idLeaveRq: req.params.id})
            await aLeaveRq.updateOne({$set: req.body});
            res.status(200).json("Update successfully!");
        } catch (error) {
            res.status(500).json(error);
        }
    },
    employHasLeaveRq: async (req, res)=>{
        try {
            const aLeaveRq =await leaveRq.findOne( {employee: req.params.id})
            res.status(200).json(aLeaveRq);
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

module.exports = leaveRqController;