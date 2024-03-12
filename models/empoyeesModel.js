const mongoose = require('mongoose')
//Nhân viên
const employeesSchema = new mongoose.Schema({
    idEmpoyee:{
        type: String,
        unique: true  
    },
    name:{
        type: String,
        required: "name is required"
    },
    birthh:{
        type: String,
        required: "birth is required"
    },
    gender:{
        type: String,
        required: "birth is required"
    },
    address:{
        type: String
    },
    citizenIdentity:{   //CCCD
        type: Number
    },
    phone:{
        type: Number,
        required: "phone is required"
    },
    dateOfJoin:{    //ngày vào công ty
        type: String
    },
    image:{   
        type: String
    },
    email:{
        type: String,
        unique: true
    },
    position:{
        type: mongoose.Schema.Types.ObjectId,
        ref: "positions"
    },
    department:{
        type: mongoose.Schema.Types.ObjectId,
        ref: "departments"
    },
    salary:{
        type: Number
    },
    status:{
        type: String
    },
    endDate:{
        type: String
    } 
},{timestamps: true}
)

module.exports = mongoose.model('employees',employeesSchema)