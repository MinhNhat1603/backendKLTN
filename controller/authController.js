const user = require("../models/usersModel");
const keyToken = require("../models/keyTokenModel");

const jwt = require("jsonwebtoken");

const key = 'KhoaLuan';

const authController = {
    loginUser:async (req, res)=>{
        try {
            const auser =await user.findOne({
                userName: req.body.userName,
                password: req.body.password
            });
            if(!auser){
                return res.status(404).json("Wrong username or password");
            }else{ 
                const accessToken = jwt.sign({
                    userName: auser.userName, 
                    role: auser.role
                },
                key, 
                {expiresIn:"8h"}
                );
                const {password,...others}=auser._doc;
                await keyToken.create({key:accessToken});
                return res.status(200).json({...others,accessToken});      
            }     
        } catch (error) {
            return res.status(500).json(error);
        }
    },
    logoutUser:async (req, res)=>{
        try {
            // Lấy token từ tiêu đề và hủy phiên đăng nhập
            const token = req.headers.token;
            if (!token) {
                return res.status(400).json("Token not provided");
            }
            const accessToken = token.split(" ")[1]; // Tách token từ tiêu đề
            req.session.destroy(); // Hủy phiên đăng nhập
    
            // Xóa tài liệu từ bộ sưu tập keyToken dựa trên accessToken
            const deletedToken = await keyToken.findOneAndDelete({ key: accessToken });
            if (!deletedToken) {
                return res.status(404).json("Token not found");
            }
    
            res.status(200).json("Logout successful!");
        } catch (error) {
            res.status(500).json(error);
        }
    },

    veryfyToken: (req,res,next)=>{
        const token= req.headers.token;
        if(token){
            //Bearer token
            const accessToken =token.split(" ")[1];
            jwt.verify(accessToken, key,(error,user)=>{
                if(error){
                    res.status(403).json("Token is not valid")
                }
                // req.user = userName
                res.status(200).json("Oce")
            });
        }else{
            res.status(401).json("you are not authenticated")
        }
    },

    veryfyEmploy: (req,res,next)=>{
        const token= req.headers.token;
        if(token){
            //Bearer token
            const accessToken =token.split(" ")[1];
            jwt.verify(accessToken, key,(error,user)=>{
                if(error){
                    res.status(403).json("Token is not valid")
                }
                req.user = user.userName;
                req.role = user.role;
                return next();
                
            });
        }else{
            res.status(401).json("you are not authenticated")
        }
    },
    veryfyAdmin: (req,res,next)=>{
        const token= req.headers.token;
        if(token){
            //Bearer token
            const accessToken =token.split(" ")[1];
            jwt.verify(accessToken, key,(error,user)=>{
                if(error){
                    res.status(403).json("Token is not valid")
                }
                if( user.role == "admin"){
                    req.user = user.userName;
                    req.role = user.role;
                    next();
                }else{
                    res.status(401).json("you are not authenticated")
                }
            });
        }else{
            res.status(401).json("you are not authenticated")
        }
    }
}
module.exports = authController;

