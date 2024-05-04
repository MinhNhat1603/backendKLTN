const mongoose = require('mongoose')

const userSchema = new mongoose.Schema({
    userName:{
        type: String,
        required: "user name is required",
        unique: true,
        ref: "employees"
    },
    password:{
        type: String,
        required: "password is required"
    },
    role:{
        type: String,
        required: "role is required"
    },
    status:{
        type: String,
    },
    userCreate:{
        type: String,
        ref: 'users'
    }
},{timestamps: true}
)

module.exports = mongoose.model('users',userSchema)