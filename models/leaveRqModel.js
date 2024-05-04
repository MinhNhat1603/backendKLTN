const mongoose = require('mongoose')
//Đơn xin nghi phep
const leaveRqSchema = mongoose.Schema({
    employee:{
        type: String,
        required: "employeerequired",
        ref: "employee"
    },
    idLeaveRq:{
        type: String,
        required: "id is required"
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
        type: String
    },
    timeEnd:{
        type: String
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

module.exports = mongoose.model('leave',leaveRqSchema)