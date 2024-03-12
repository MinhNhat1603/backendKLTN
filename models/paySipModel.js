const mongoose = require('mongoose')
// bang luongw
const timeSheetSchema = mongoose.Schema({
    employee:{
        type: mongoose.Schema.Types.ObjectId,
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
        type: mongoose.Schema.Types.ObjectId,
        ref: "insurance"
    },
    overTIme:{  //số giờ tăng ca trong tháng
        type: Number
    },
    overTimeMoney:{  //số tiền tăng ca trong tháng
        type: Number
    },
    decision:[
        {     //quyết định thưởng/phạt trong tháng
            type: mongoose.Schema.Types.ObjectId,
            ref: "decision"
        }
    ],
    decisionMoney:{ //tổng tiền theo các quyết định
        type: Number
    },
    positionAllowance:{     //phụ cấp chức vụ
        type: Number
    },
    leaveHour:{     //số giờ đi làm muộn/về sớm
        type: Number
    },
    leaveMoney:{
        type: Number
    },
    paiLeave:{      //Số ngày nghỉ có phép
        type: Number
    },
    unpaiLeave:{      //Số ngày nghỉ không phép
        type: Number
    },
    fineUnpaiLeave:{
        type: Number
    },
    advanceRq:[
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: "advanceRq"
        }
    ],
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
        type: mongoose.Schema.Types.ObjectId,
        ref: 'users'
    }

},{timestamps: true}
)

module.exports = mongoose.model('timeSheet',timeSheetSchema)