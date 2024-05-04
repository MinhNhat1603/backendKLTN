const user = require("../models/usersModel");
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
                    userName: auser.userName
                },
                key, 
                {expiresIn:"8h"}
                );
                const {password,...others}=auser._doc;
                return res.status(200).json({...others,accessToken});      
            }     
        } catch (error) {
            return res.status(500).json(error);
        }
    },
    logoutUser:async (req, res)=>{
        try {
            req.session.destroy();
            res.status(200).json("logout!!");
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
                next();
            });
        }else{
            res.status(401).json("you are not authenticated")
        }
    },
}
module.exports = authController;
