const user = require("../models/usersModel");
const employee = require("../models/employeesModel");
const userController = {
    //ADD USER
    addUser: async (req,res) => {
        try {
            const aEmploy =await employee.findOne({ idEmployee:  req.params.id});
            if(aEmploy.status !== "Đang thử việc/ đào tạo"){
                var newUser = new user({
                    userName: aEmploy.idEmployee,
                    password: aEmploy.phone,
                    role: aEmploy.position,
                    status: "Đã tạo tài khoản"
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
            return res.status(500).json(error);
        }
    },
    //GET ALL USER
    getAllUser: async (req,res) => {
        try {
            const allUser = await user.find();
            return res.status(200).json(allUser);
        } catch (error) {
            return res.status(500).json(error);
        }
    },
     //GET A USER
    getAUser: async (req, res)=>{
        try {
            const aUser =await user.findOne(req.params.id);
            return res.status(200).json(aUser);
        } catch (error) {
            return res.status(500).json(error);
        }
    },

    //UPDATE USER
    updateUser: async (req, res)=>{
        try {
            const User =await user.findOne(req.params.id);
            await User.updateOne({$set: req.body});
            return res.status(200).json("Update successfully!");
        } catch (error) {
            return res.status(500).json(error);
        }
    },
    changePassword: async (req, res)=>{
        try {
            const User =await user.findOne(req.params.id);
            if(req.user == aLeaveRq.employee || req.role =="admin"){
                await User.updateOne({password: req.body.password});
                return res.status(200).json("Update successfully!");
            }else {
                return res.status(403).json("You do not have permission");
            }
            
            
        } catch (error) {
            return res.status(500).json(error);
        }
    },

};

module.exports = userController;