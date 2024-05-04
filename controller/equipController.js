const user = require("../models/usersModel");
const equip = require("../models/equipModel");
const equipController = {
    //ADD equip
    addEquip: async (req,res) => {
        try {
            const newEquip =new equip(req.body);
            const saveEquip = await newEquip.save();
            res.status(200).json(saveEquip);
        } catch (error) {
            res.status(500).json(error);
        }
    },
    //GET ALL equip
    getAllEquip: async (req,res) => {
        try {
            const allEquip = await equip.find();
            res.status(200).json(allEquip);
        } catch (error) {
            res.status(500).json(error);
        }
    },
     //GET A equip
    getAEquip: async (req, res)=>{
        try {
            const aEquip =await equip.findById(req.params.id)
            res.status(200).json(aEquip);
        } catch (error) {
            res.status(500).json(error);
        }
    },

    //UPDATE equip
    updateEquip: async (req, res)=>{
        try {
            const aEquip =await equip.findById(req.params.id)
            await aEquip.updateOne({$set: req.body});
            res.status(200).json("Update successfully!");
        } catch (error) {
            res.status(500).json(error);
        }
    },

    // Các thiết bị của một nhân viên
    employHasequip:async (req, res)=>{
        try {
            const aEquip =await equip.find( {employee: req.params.id})
            res.status(200).json(aEquip);
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

module.exports = equipController;