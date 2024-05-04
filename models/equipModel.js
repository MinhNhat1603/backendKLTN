const mongoose = require('mongoose')
//Thiet bị giao cho nhân viên
const equipSchema = mongoose.Schema({
    employee:{
        type: String,
        required: "employeerequired",
        ref: "employee"
    },
    Name:{  //tên thiết bị
        type: String,
        required: "id is required"
    },
    quantity:{   //so lượng
        type: String
    },
    image:{
        type: String
    },
    receivedDate:{
        type: String
    },
    returnDate:{
        type: String
    },
    status:{    
        type: String,
        required: "status is required"
    },
    approvedUser:{
        type: String,
        ref: 'users'
    }
},{timestamps: true}
)

module.exports = mongoose.model('equip',equipSchema)