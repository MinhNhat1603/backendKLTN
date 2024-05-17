const mongoose = require('mongoose')
// bang cham cong
const timeSheetSchema = mongoose.Schema({
    employee:{
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
    date:{
        type: Number,
        required: "day is required"
    },
    checkIn:{
        type: Number
    },
    checkOut:{
        type: Number
    },
    overTime:{
        type: Number
    },
    workday:{
        type: Number
    },
    status:{
        type: String
    }
    
},{timestamps: true}
)

module.exports = mongoose.model('timeSheet',timeSheetSchema)