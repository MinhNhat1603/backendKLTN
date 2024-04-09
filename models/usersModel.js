const mongoose = require('mongoose')

const userSchema = new mongoose.Schema({
    userName:{
        type: String,
        required: "user name is required",
        unique: true
    },
    password:{
        type: String,
        required: "password is required"
    },
    role:{
        type: String,
        required: "role is required"
    },
    employee:{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'employees' 
    },
    userCreate:{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'users'
    }
},{timestamps: true}
)

module.exports = mongoose.model('users',userSchema)