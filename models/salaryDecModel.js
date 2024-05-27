const mongoose = require('mongoose')
// Quyet dinh
const salaryDecisionSchema = new mongoose.Schema({
    employee:{
        type: String,
        required: "employee í required",
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
    oldSalary:{     
        type: Number
    },
    newSalary:{      
        type: Number
    },
    travelAllowance:{     //trợ cấp đi lại
        type: Number,
    },
    eatingAllowance:{     //trợ cấp ăn uống
        type: Number,
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

module.exports = mongoose.model('salaryDecision',salaryDecisionSchema)