const mongoose = require('mongoose')
// Hợp đồng
const contractSchema = new mongoose.Schema({
    employee:{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'employees' 
    },
    idContract:{
        type: String,
        unique: true  
    },
    contractType:{
        type: String,
        required: "contract type is required"
    },
    signDate:{
        type: String,
        required: "sign date is required"
    },
    startDate:{
        type: String,
        required: "start date is required"
    },
    endDate:{
        type: String,
        required: "end date is required"
    },
    position:{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'position' 
    },
    department:{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'department' 
    },
    basicSalary:{     //Lương cơ bản
        type: Number
    },
    allowance:{     //Phụ cấp
        type: Number
    },
    image:{   
        type: String
    },
    note:{   
        type: String
    },
    userCreate:{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'users'
    }
},{timestamps: true}
)

module.exports = mongoose.model('contracts',contractSchema)