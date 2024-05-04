const user = require("../models/usersModel");
const advanceRq = require("../models/advanceRqModel");
const advanceRqController = {
    //ADD advanceRq
    addAdvanceRq: async (req,res) => {
        try {
            const newAdvanceRq =new advanceRq(req.body);
            const saveAdvanceRq = await newAdvanceRq.save();
            res.status(200).json(saveAdvanceRq);
        } catch (error) {
            res.status(500).json(error);
        }
    },
    //GET ALL advanceRq
    getAllAdvanceRq: async (req,res) => {
        try {
            const allAdvanceRq = await advanceRq.find();
            res.status(200).json(allAdvanceRq);
        } catch (error) {
            res.status(500).json(error);
        }
    },
     //GET A decision
    getAdvanceRq: async (req, res)=>{
        try {
            const AdvanceRq =await advanceRq.findOne( {idAdvanceRq: req.params.id})
            res.status(200).json(AdvanceRq);
        } catch (error) {
            res.status(500).json(error);
        }
    },

    //UPDATE advanceRq
    updateAdvanceRq: async (req, res)=>{
        try {
            const AdvanceRq =await advanceRq.findOne( {idAdvanceRq: req.params.id})
            await AdvanceRq.updateOne({$set: req.body});
            res.status(200).json("Update successfully!");
        } catch (error) {
            res.status(500).json(error);
        }
    },

    //Cac phiêu ứng tiên của nhân viên
    employHasAdvanceRq: async (req, res)=>{
        try {
            const AdvanceRq =await advanceRq.find( {employee: req.params.id})
            res.status(200).json(AdvanceRq);
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

module.exports = advanceRqController;