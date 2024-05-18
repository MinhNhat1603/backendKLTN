const mongoose = require('mongoose')
//Đơn Ứng tiền
const advanceRqSchema = mongoose.Schema({
    employee:{
        type: String,
        required: "employeeis required",
        ref: "employees"
    },
    year:{
        type: Number
    },
    month:{
        type: Number
    },
    money:{
        type: Number
    },
    reason:{      //lí do
        type: String
    },
    status:{    
        type: String
    },
    approvedUser:{
        type: String,
        ref: 'users'
    }
},{timestamps: true}
)

module.exports = mongoose.model('advanceRq',advanceRqSchema)