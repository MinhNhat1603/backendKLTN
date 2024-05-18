const mongoose = require('mongoose')
//Đơn xin nghi phep
const leaveRqSchema = mongoose.Schema({
    employee:{
        type: String,
        required: "employee required",
        ref: "employee"
    },
    leaveRqType:{   //Nghỉ phép/ nghỉ làm
        type: String
    },
    reason:{      //lí do
        type: String
    },
    image:{
        type: String
    },
    timeStart:{
        type: Number
    },
    timeEnd:{
        type: Number
    },
    status:{    
        type: String,
        required: "status is required"
    },
    approvedUser:{
        type: String,
        ref: 'users'
    }
},{timestamps: true}
)

module.exports = mongoose.model('leaveRq',leaveRqSchema)