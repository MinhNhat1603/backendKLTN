const user = require("../models/usersModel");
const advanceRq = require("../models/advanceRqModel");
const advanceRqController = {
    //ADD advanceRq
    addAdvanceRq: async (req, res) => {
        try {
            req.body.employee = req.user;
            const newAdvanceRq = new advanceRq(req.body);
            const saveAdvanceRq = await newAdvanceRq.save();
            res.status(200).json(saveAdvanceRq);
        } catch (error) {
            res.status(500).json(error);
        }
    },
    //GET ALL advanceRq
    getAllAdvanceRq: async (req, res) => {
        try {
            const allAdvanceRq = await advanceRq.find();
            res.status(200).json(allAdvanceRq);
        } catch (error) {
            res.status(500).json(error);
        }
    },
    //GET A advanceRq
    getAdvanceRq: async (req, res) => {
        try {
            const AdvanceRq = await advanceRq.findById(req.params.id);
            if(req.user == AdvanceRq.employee || req.user =="admin"){
                return res.status(200).json(AdvanceRq);
            }else {
                return res.status(403).json("You do not have permission");
            }
        } catch (error) {
            res.status(500).json(error);
        }
    },

    //UPDATE advanceRq
    updateAdvanceRq: async (req, res) => {
        try {
            const AdvanceRq = await advanceRq.findById(req.params.id)
            delete req.body.status;
            delete req.body.employee;
            if(req.user == AdvanceRq.employee || req.user =="admin"){
                await AdvanceRq.updateOne({ $set: req.body });
                res.status(200).json("Update successfully!");
            }else {
                return res.status(403).json("You do not have permission");
            }
        } catch (error) {
            res.status(500).json(error);
        }
    },

    approvalAdvanceRq: async (req, res) => {
        try {
            const AdvanceRq = await advanceRq.findById(req.params.id)
            await AdvanceRq.updateOne({
                status: req.body.status,
                approvedUser: req.user
            });
            res.status(200).json("Update successfully!");
        } catch (error) {
            res.status(500).json(error);
        }
    },

    //Cac phiêu ứng tiên của nhân viên
    employHasAdvanceRq: async (req, res) => {
        try {
            if(req.user ==req.params.id || req.user =="admin"){
                const AdvanceRq = await advanceRq.find({ employee: req.params.id })
                res.status(200).json(AdvanceRq);
            }else {
                return res.status(403).json("You do not have permission");
            }
        } catch (error) {
            res.status(500).json(error);
        }
    },
};

module.exports = advanceRqController;