const mongoose = require('mongoose')
//Đơn Ứng tiền
const leaveRqSchema = mongoose.Schema({
    employee:{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'employees' 
    },
    idLeaveRq:{
        type: String,
        required: "id is required"
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
        type: mongoose.Schema.Types.ObjectId,
        ref: 'users'
    }
},{timestamps: true}
)

module.exports = mongoose.model('leave',leaveRqSchema)