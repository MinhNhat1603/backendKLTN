const user = require("../models/usersModel");
const userController = {
    //ADD USER
    addUser: async (req,res) => {
        try {
            const newUser =new user(req.body);
            const saveUser = await newUser.save();
            res.status(200).json(saveUser);
        } catch (error) {
            res.status(500).json(error);
        }
    },
    //GET ALL USER
    getAllUser: async (req,res) => {
        try {
            const voucherAll = await user.find();
            res.status(200).json(voucherAll);
        } catch (error) {
            res.status(500).json(error);
        }
    },
     //GET A USER
     getAUser: async (req, res)=>{
        try {
            const aUser =await user.findById(req.params.id).populate("orders");
            res.status(200).json(aUser);
        } catch (error) {
            res.status(500).json(error);
        }
    },

    //UPDATE USER
    updateUser: async (req, res)=>{
        try {
            const User =await user.findById(req.params.id);
            await User.updateOne({$set: req.body});
            res.status(200).json("Update successfully!");
        } catch (error) {
            res.status(500).json(error);
        }
    },

    //DELETE USER
    deleteUser: async (req, res)=>{
        try {
            await user.findByIdAndDelete(req.params.id);
            res.status(200).json("Delete successfully!");
        } catch (error) {
            res.status(500).json(error);
        }
    },
};

module.exports = userController;