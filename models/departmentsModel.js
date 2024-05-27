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
        type: String,
        ref: "employees"
    },
    branch:{
        type: String,
        ref: "branches",
        required: "branch is required"
    },
    description:{
        type: String
    },
    status:{
        type: String,
        required: "status is required"
    }

},{timestamps: true}
)

module.exports = mongoose.model('departments',departmentSchema)