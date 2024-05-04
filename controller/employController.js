const employee = require("../models/employeesModel");
const employController = {
    //ADD  employ
    addEmploy: async (req,res) => {
        try {
            var newEmploy =new employee(req.body);
            
            var id = "TV";
            var count = 1;

            var newID = `${id}${(count).toString().padStart(2, '0')}`;
            var existingEmployee = await employee.findOne({ idEmployee: newID });

            while (existingEmployee != null) {
                count ++;
                newID = `${id}${(count).toString().padStart(2, '0')}`;
                existingEmployee = await employee.findOne({ idEmployee: newID });
            }

            newEmploy.idEmployee = newID;
            newEmploy.status = "Đang thử việc/ đạo tạo"
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
    employNotAchieved: async (req, res)=>{
        try {
            const employ =await employee.findOne({ idEmployee: req.params.id});
            await employ.updateOne({
                status: "Không đạt",
            });
            res.status(200).json("Update successfully!");
        } catch (error) {
            res.status(500).json(error);
        }
    },
    employAcheieved: async (req, res)=>{
        try {
            const employ =await employee.findOne({ idEmployee: req.params.id});
            const fullName = employ.name;
            const words = fullName.split(' ');
    
            const initials = words.map(word => word.charAt(0).toUpperCase());
            
            var id = initials.join('');
            var count = 1;

            var newID = `${id}${(count).toString().padStart(2, '0')}`;
            var existingEmployee = await employee.findOne({ idEmployee: newID });

            while (existingEmployee != null) {
                count ++;
                newID = `${id}${(count).toString().padStart(2, '0')}`;
                existingEmployee = await employee.findOne({ idEmployee: newID });
            }
            await employ.updateOne({
                status: "Đã đạt",
                idEmployee: newID
            });
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
