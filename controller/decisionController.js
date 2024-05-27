const user = require("../models/usersModel");
const decision = require("../models/decisionModel");
const decisionController = {
    //ADD decision
    addDecision: async (req,res) => {
        try {
            const newDecision =new decision(req.body);
            const saveDecision = await newDecision.save();
            return res.status(200).json(saveDecision);
        } catch (error) {
            return res.status(500).json(error);
        }
    },
    //GET ALL decision
    getAllDecision: async (req,res) => {
        try {
            const allDecision = await decision.find();
            return res.status(200).json(allDecision);
        } catch (error) {
            return res.status(500).json(error);
        }
    },
     //GET A decision
    getADecision: async (req, res)=>{
        try {
            const aDecision =await decision.findOne( {idDecision: req.params.id})
            if(req.user == aDecision.employee || req.user =="admin"){
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
            if(req.user == req.params.id || req.user =="admin"){
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