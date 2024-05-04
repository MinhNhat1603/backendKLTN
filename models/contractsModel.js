const mongoose = require('mongoose')
// Hợp đồng
const contractSchema = new mongoose.Schema({
    employee:{
        type: String,
        required: "employeeis required",
        ref: "employees"
    },
    idContract:{
        type: String,
        unique: "id Contract unique"  
    },
    contractType:{
        type: String,
        required: "contract type is required"
    },
    signDate:{ //ngày kí
        type: String,
        required: "sign date is required"
    },
    startDate:{ //Ngày hiệu lực
        type: String,
        required: "start date is required"
    },
    endDate:{
        type: String,
        required: "end date is required"
    },
    position:{  //Chuc vụ
        type: String,
        ref: 'positions' 
    },
    department:{    //Phong
        type: String,
        ref: 'departments' 
    },
    basicSalary:{     //Lương cơ bản
        type: Number,
        ref: 'Salary'
    },
    allowance:[
        {
            name: {
                type: String
            },
            money:{
                type: Number
            }
        }
    ],
    image:{   
        type: String
    },
    note:{   
        type: String
    },
    contractAddendum:[
        {
            type: String,
            ref: 'salaryDecision'
        }
    ],

    userCreate:{
        type: String,
        ref: 'users'
    }
},{timestamps: true}
)

module.exports = mongoose.model('contracts',contractSchema)