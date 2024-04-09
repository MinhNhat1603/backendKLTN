const user = require("../models/usersModel");
const jwt = require("jsonwebtoken");
const key = 'tieuluan';

const authController = {
    loginUser:async (req, res)=>{
        try {
            const auser =await user.findOne({userName: req.body.userName});
            const apass= req.body.password;
            if(!auser){
                return res.status(404).json("Wrong username");
            }
            if(apass === auser.password && auser){ 
                const accessToken = jwt.sign({
                    id: auser.id,
                    userName: auser.userName,
                    role: auser.role
                },
                key, 
                {expiresIn:"24h"}
                );
                const {password,...others}=auser._doc;
                return res.status(200).json({...others,accessToken});      
            }
            else{
                return res.status(404).json("Wrong password");
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
    }  
}
module.exports = authController;
