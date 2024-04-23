const employee = require("../models/employeesModel");
const employController = {
    //ADD  employ
    addEmploy: async (req,res) => {
        try {
            var newEmploy =new employee(req.body);

            const fullName = newEmploy.name;
            const words = fullName.split(' ');
    
            // Lấy ký tự đầu tiên của mỗi từ và chuyển thành chữ hoa
            const initials = words.map(word => word.charAt(0).toUpperCase());
            
            // Kết hợp các ký tự đầu thành chuỗi duy nhất
            var id = initials.join('');
            var count = 1;
            // Lấy tên cần tìm từ req.params hoặc req.query, tùy thuộc vào cách bạn gửi dữ liệu
            var newID = `${id}${(count).toString().padStart(2, '0')}`;
            var existingEmployee = await employee.findOne({ idEmployee: newID });

            while (existingEmployee != null) {
                count ++;
                newID = `${id}${(count).toString().padStart(2, '0')}`;
                existingEmployee = await employee.findOne({ idEmployee: newID });
            }

            newEmploy.idEmployee = newID;
            const saveEmploy = await newEmploy.save();
            res.status(200).json(saveEmploy);
        } catch (error) {
            res.status(500).json(error);
        }
    },
    //GET ALL employ
    getAllEmploy: async (req,res) => {
        try {
            const employALL = await employee.find();
            res.status(200).json(employALL);
        } catch (error) {
            res.status(500).json(error);
        }
    },
     //GET A employ
    getAEmploy: async (req, res)=>{
        try {
            const aEmploy =await employee.findOne({ idEmployee: req.params.id});
            res.status(200).json(aEmploy);
        } catch (error) {
            res.status(500).json(error);
        }
    },
    //UPDATE employ
    updateEmploy: async (req, res)=>{
        try {
            const employ =await employee.findOne({ idEmployee: req.params.id});
            await employ.updateOne({$set: req.body});
            res.status(200).json("Update successfully!");
        } catch (error) {
            res.status(500).json(error);
        }
    },

    // //disable employ
    // disableEmploy: async (req, res)=>{
    //     try {
    //         await employee.findByIdAndDelete(req.params.id);
    //         res.status(200).json("Disable successfully!");
    //     } catch (error) {
    //         res.status(500).json(error);
    //     }
    // },
};

module.exports = employController;
