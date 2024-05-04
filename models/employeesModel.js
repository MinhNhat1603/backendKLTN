const mongoose = require('mongoose')
//Nhân viên
const employeesSchema = new mongoose.Schema({
    idEmployee:{
        type: String,
        unique: true
    },
    name:{
        type: String,
        required: "name is required"
    },
    birth:{
        type: String,
        required: "birth is required"
    },
    gender:{
        type: String,
        required: "gender is required"
    },
    address:{
        type: String
    },
    citizenIdentity:{   //CCCD
        type: Number,
        required: "citizenIdentity is required"
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
        type: String
    },
    insuranceCode:{ //Mã BHXH
        type: String,
        required: "Insurance is required"
    },
    position:{  //Chức vụ
        type: String,
        ref: "positions",
        required: "position is required"
    },
    department:{    //Phòng ban
        type: String,
        ref: "departments",
        required: "department is required"
    },
    salary:{    //Lương
        type: Number
    },
    status:{
        type: String
    },
    endDate:{   // Ngày nghỉ nếu có
        type: String
    } 
},{timestamps: true}
)

module.exports = mongoose.model('employees',employeesSchema)