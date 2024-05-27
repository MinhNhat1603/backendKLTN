const user = require("../models/usersModel");
const leaveRq = require("../models/leaveRqModel");
const leaveRqController = {
    //ADD leaveRq
    addLeaveRq: async (req, res) => {
        try {
            if (req.user === "admin" || req.user === req.body.employee) {
                const aLeaveRq = req.body;
                const timeStart = new Date(aLeaveRq.timeStart); // Đầu vào : " 2024-05-21 "
                const timeEnd = new Date(aLeaveRq.timeEnd);
                const newLeaveRq = new leaveRq({
                    employee: aLeaveRq.employee,
                    leaveRqType: aLeaveRq.leaveRqType,
                    reason: aLeaveRq.reason,
                    image: aLeaveRq.image,
                    timeStart: timeStart,
                    timeEnd: timeEnd,
                    status: "Chưa duyệt",

                });
                const saveLeaveRq = await newLeaveRq.save();
                return res.status(200).json(saveLeaveRq);
            } else {
                return res.status(400).json("Bạn không có quyền");
            }

        } catch (error) {
            return res.status(500).json(error);
        }
    },
    //GET ALL leaveRq
    getAllLeaveRq: async (req, res) => {
        try {
            const allLeaveRq = await leaveRq.find();
            return res.status(200).json(allLeaveRq);
        } catch (error) {
            return res.status(500).json(error);
        }
    },
    //GET A leaveRq 
    getALeaveRq: async (req, res) => {
        try {
            const aLeaveRq = await leaveRq.findById(req.params.id)
            if(req.user == aLeaveRq.employee || req.user =="admin"){
                return res.status(200).json(aLeaveRq);
            }else {
                return res.status(403).json("You do not have permission");
            }
        } catch (error) {
            return res.status(500).json(error);
        }
    },

    //UPDATE leaveRq
    updateLeaveRq: async (req, res) => {
        try {
            const aLeaveRq = await leaveRq.findById(req.params.id)
            if(req.user == aLeaveRq.employee || req.user =="admin"){
                await aLeaveRq.updateOne({ $set: req.body });
                return res.status(200).json("Update successfully!");
            }else {
                return res.status(403).json("You do not have permission");
            }
        } catch (error) {
            return res.status(500).json(error);
        }
    },
    employHasLeaveRq: async (req, res) => {
        try {
            if(req.user == req.params.id || req.user =="admin"){
                const aLeaveRq = await leaveRq.find({ employee: req.params.id })
                return res.status(200).json(aLeaveRq);
            }else {
                return res.status(403).json("You do not have permission");
            }
        } catch (error) {
            return res.status(500).json(error);
        }
    },
};

module.exports = leaveRqController;