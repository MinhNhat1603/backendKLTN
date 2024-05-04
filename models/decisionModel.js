const mongoose = require('mongoose')
// Quyet dinh
const decisionSchema = new mongoose.Schema({
    employee:{
        type: String,
        required: "employeeis required",
        ref: "employees"
    },
    idDecision:{
        type: String,
        unique: true,
        required: "ID is required"
    },
    decisionName:{
        type: String
    },
    signDate:{
        type: String,
        required: "sign date is required"
    },
    month:{ //thời gian thực hiện
        type: Number,
        required: "start date is required"
    },
    year:{
        type: Number,
        required: "end date is required"
    },
    description:{
        type: String
    },
    money:{     //Số tiền thưởng hoặc trừ
        type: Number
    },
    image:{     
        type: String
    },
    status:{
        type: String
    },
    approvedUser:{
        type: String,
        ref: 'users'
    },
    userCreate:{
        type: String,
        ref: 'users'
    }
},{timestamps: true}
)

module.exports = mongoose.model('decision',decisionSchema)