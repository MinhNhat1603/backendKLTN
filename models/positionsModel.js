const mongoose = require('mongoose')
//chức vụ
const positionSchema = mongoose.Schema({
    title:{
        type: String,
        required: "title is required"
    },
    description:{
        type: String,
    },
    allowance:{
        type: Number
    }
},{timestamps: true}
)

module.exports = mongoose.model('positions',positionSchema)