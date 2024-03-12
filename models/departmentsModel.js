const mongoose = require('mongoose')
// Phòng ban
const departmentSchema = mongoose.Schema({
    idDepartment:{
        type: String,
        required: "Id department is required"
    },
    name:{
        type: String,
        required: "name is required"
    },
    manager:{   //truong phong
        type: mongoose.Schema.Types.ObjectId,
        ref: "users"
    },
    branch:{
        type: mongoose.Schema.Types.ObjectId,
        ref: "branches"
    },
    description:{
        type: String
    }
},{timestamps: true}
)

module.exports = mongoose.model('departments',departmentSchema)