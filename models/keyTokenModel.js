const mongoose = require('mongoose')

const keySchema = mongoose.Schema({
    key:{
        type: String,
        required: true
    },
    createdAt: { // Trường để lưu trữ ngày tạo
        type: Date,
        default: Date.now,
        index: { expires: '8h' } // Chỉ mục TTL: tài liệu hết hạn sau 30 ngày từ khi tạo
    }
},{
    timestamps: true,
    collection: "keys"
},

)

module.exports = mongoose.model('key',keySchema)