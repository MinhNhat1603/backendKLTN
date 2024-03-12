const mongoose = require('mongoose')
// Quyet dinh
const decisionSchema = new mongoose.Schema({
    employee:{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'employees' 
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
        type: String,
        required: "start date is required"
    },
    year:{
        type: String,
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
        type: mongoose.Schema.Types.ObjectId,
        ref: 'users'
    },
    userCreate:{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'users'
    }
},{timestamps: true}
)

module.exports = mongoose.model('decision',decisionSchema)