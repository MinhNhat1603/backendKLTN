const mongoose = require('mongoose')
//bảo hiểm xã hội
const insuranceSchema = mongoose.Schema({
    employee:{
        type: String,
        ref: 'employees' 
    },
    isuranceCode:{
        type: String,
        required: "code is required"
    },
    salaryInsurance:{   //So tien co so de dong bao hiem
        type: String,
        required: "location is required"
    },
    companyPay:{      
        type: Number
    },
    employeePay:{    
        type: Number
    },
    year:{
        type: Number
    },
    month:{
        type: Number
    },
    status:{
        type: String
    },
    userCreate:{
        type: String,
        ref: 'users'
    }
},{timestamps: true}
)

module.exports = mongoose.model('insurance',insuranceSchema)