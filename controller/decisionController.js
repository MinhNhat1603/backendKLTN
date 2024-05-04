const user = require("../models/usersModel");
const decision = require("../models/decisionModel");
const decisionController = {
    //ADD decision
    addDecision: async (req,res) => {
        try {
            const newDecision =new decision(req.body);
            const saveDecision = await newDecision.save();
            res.status(200).json(saveDecision);
        } catch (error) {
            res.status(500).json(error);
        }
    },
    //GET ALL decision
    getAllDecision: async (req,res) => {
        try {
            const allDecision = await decision.find();
            res.status(200).json(allDecision);
        } catch (error) {
            res.status(500).json(error);
        }
    },
     //GET A decision
    getADecision: async (req, res)=>{
        try {
            const aDecision =await decision.findOne( {idDecision: req.params.id})
            res.status(200).json(aDecision);
        } catch (error) {
            res.status(500).json(error);
        }
    },

    //UPDATE contract
    updateDecision: async (req, res)=>{
        try {
            const aDecision =await decision.findOne( {idDecision: req.params.id})
            await aDecision.updateOne({$set: req.body});
            res.status(200).json("Update successfully!");
        } catch (error) {
            res.status(500).json(error);
        }
    },

    //Các quyên định của nhân viên
    employHasDecision: async (req, res)=>{
        try {
            const aDecision =await decision.find( {employee: req.params.id})
            res.status(200).json(aDecision);
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

module.exports = decisionController;