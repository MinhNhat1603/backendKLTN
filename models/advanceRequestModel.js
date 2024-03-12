const mongoose = require('mongoose')
//Đơn Ứng tiền
const advanceRqSchema = mongoose.Schema({
    employee:{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'employees' 
    },
    idAdvanceRq:{
        type: String,
        required: "id is required"
    },
    money:{
        type: String,
        required: "location is required"
    },
    month:{
        type: Number
    },
    year:{
        type: Number
    },
    reason:{      //lí do
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

module.exports = mongoose.model('advanceRq',advanceRqSchema)