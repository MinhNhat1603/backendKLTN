const mongoose = require('mongoose')
// bang luongw
const paySlipSchema = mongoose.Schema({
    idPaySlip:{
        type: String,
        unique: true
    },employee:{
        type: String,
        ref: "users"
    },
    year:{
        type: Number,
        required: "year is required"
    },
    month:{
        type: Number,
        required: "month is required"
    },
    salary:{  // tiền lương cơ bản đang nhận
        type: Number
    },
    insurance:{     //tiền bảo hiểm cùng tháng
        type: Number
    },
    overTIme:{  //số giờ tăng ca trong tháng
        type: Number
    },
    overTimeMoney:{  //số tiền tăng ca trong tháng
        type: Number
    },
    decisionMoney:{ //tổng tiền theo các quyết định
        type: Number
    },
    positionAllowance:{     //phụ cấp chức vụ
        type: Number
    },
    workDay:{     //số giờ đi làm muộn/về sớm
        type: Number
    },
    workSalary:{
        type: Number
    },
    paiLeave:{      //Số ngày nghỉ có phép
        type: Number
    },
    advanceMoney:{
        type: Number
    },
    totalSalary:{
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

module.exports = mongoose.model('paySlip',paySlipSchema)