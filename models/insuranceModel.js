const mongoose = require('mongoose')
//bảo hiểm xã hội
const insuranceSchema = mongoose.Schema({
    employee:{
        type: mongoose.Schema.Types.ObjectId,
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
    companyPay:{      //lí do
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
        type: mongoose.Schema.Types.ObjectId,
        ref: 'users',
        required: "user create is required"
    }
},{timestamps: true}
)

module.exports = mongoose.model('insurance',insuranceSchema)