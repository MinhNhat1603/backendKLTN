const mongoose = require('mongoose')
// bang cham cong
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
    day:{
        type: Number,
        required: "day is required"
    },
    checkIn:{
        type: Number
    },
    checkOut:{
        type: Number
    },
    overTIme:{
        type: Number
    },
    leaveTime:{
        type: Number
    }
},{timestamps: true}
)

module.exports = mongoose.model('timeSheet',timeSheetSchema)