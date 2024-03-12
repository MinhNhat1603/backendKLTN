const mongoose = require('mongoose')

const branchSchema = mongoose.Schema({
    idBranch:{
        type: String,
        required: "Id Branch is required"
    },
    name:{
        type: String,
        required: "name is required"
    },
    location:{
        type: String,
        required: "location is required"
    },
    date:{      //ngay thanh lap
        type: String
    },
    endDate:{
        type: String
    },
    status:{    //trang thai hoat dong
        type: String,
        required: "status is required"
    },
    representative:{    //Giam doc chi nhanh
        type: mongoose.Schema.Types.ObjectId,
        ref: "users"
    }
},{timestamps: true}
)

module.exports = mongoose.model('branches',branchSchema)