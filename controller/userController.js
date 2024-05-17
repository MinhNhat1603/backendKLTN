const user = require("../models/usersModel");
const employee = require("../models/employeesModel");
const userController = {
    //ADD USER
    addUser: async (req,res) => {
        try {
            const aEmploy =await employee.findOne({ idEmployee:  req.params.id});
            if(aEmploy.status == "Đã đạt"){
                var newUser = new user({
                    userName: aEmploy.idEmployee,
                    password: aEmploy.phone,
                    role: aEmploy.position,
                    status: "Đang làm việc"
                });
                const saveUser = await newUser.save();
                await aEmploy.updateOne({
                    status: "Đã tạo tài khoản",
                });
                res.status(200).json(saveUser);
            }else{
                res.status(400).json("Nhân viên chưa đạt yêu cầu");
            }
            
        } catch (error) {
            res.status(500).json(error);
        }
    },
    //GET ALL USER
    getAllUser: async (req,res) => {
        try {
            const allUser = await user.find();
            res.status(200).json(allUser);
        } catch (error) {
            res.status(500).json(error);
        }
    },
     //GET A USER
     getAUser: async (req, res)=>{
        try {
            const aUser =await user.findOne(req.params.id);
            res.status(200).json(aUser);
        } catch (error) {
            res.status(500).json(error);
        }
    },

    //UPDATE USER
    updateUser: async (req, res)=>{
        try {
            const User =await user.findOne(req.params.id);
            await User.updateOne({$set: req.body});
            res.status(200).json("Update successfully!");
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

module.exports = userController;