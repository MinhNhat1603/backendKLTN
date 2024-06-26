const employee = require("../models/employeesModel");
const branch = require("../models/branchesModel");

const employController = {
    //ADD  employ
    addEmploy: async (req, res) => {
        try {
            var newEmploy = new employee(req.body);

            var id = "TV";
            var count = 1;

            var newID = `${id}${(count).toString().padStart(2, '0')}`;
            var existingEmployee = await employee.findOne({ idEmployee: newID });

            while (existingEmployee != null) {
                count++;
                newID = `${id}${(count).toString().padStart(2, '0')}`;
                existingEmployee = await employee.findOne({ idEmployee: newID });
            }

            newEmploy.idEmployee = newID;
            newEmploy.status = "Đang thử việc/ đào tạo"
            const saveEmploy = await newEmploy.save();
            return res.status(200).json(saveEmploy);
        } catch (error) {
            return res.status(500).json(error);
        }
    },
    //GET ALL employ
    getAllEmploy: async (req, res) => {
        try {  
            const employeeIn = await employInRole(req.user);
            return res.status(200).json(employeeIn);
            
        } catch (error) {
            return res.status(500).json(error);
        }
    },
    //GET A employ
    getAEmploy: async (req, res) => {
        try {
            if (req.user == req.params.id || req.user == "admin") {
                const aEmploy = await employee.findOne({ idEmployee: req.params.id });  
                // const aEmploy = await employee.findOne(req.body);
                return res.status(200).json(aEmploy);
            } else {
                return res.status(403).json("You do not have permission");
            }

        } catch (error) {
            return res.status(500).json(error);
        }
    },
    //UPDATE employ
    updateEmploy: async (req, res) => {
        try {
            if (req.user == req.params.id || req.user == "admin") {
                const employ = await employee.findOne({ idEmployee: req.params.id });
                await employ.updateOne({ $set: req.body });
                return res.status(200).json("Update successfully!");
            } else {
                return res.status(403).json("You do not have permission");
            }
        } catch (error) {
            return res.status(500).json(error);
        }
    },
    employNotAchieved: async (req, res) => {
        try {
            const employ = await employee.findOne({ idEmployee: req.params.id });
            const id = employ.id
            await employ.updateOne({
                status: "Không đạt",
                idEmployee: id
            });
            return res.status(200).json("Update successfully!");
        } catch (error) {
            return res.status(500).json(error);
        }
    },
    employAcheieved: async (req, res) => {
        try {
            const employ = await employee.findOne({ idEmployee: req.params.id });
            const fullName = employ.name;
            const words = fullName.split(' ');

            const initials = words.map(word => word.charAt(0).toUpperCase());

            var id = initials.join('');
            id = await removeVietnameseDiacritics(id)
            var count = 1;

            var newID = `${id}${(count).toString().padStart(2, '0')}`;
            var existingEmployee = await employee.findOne({ idEmployee: newID });

            while (existingEmployee != null) {
                count++;
                newID = `${id}${(count).toString().padStart(2, '0')}`;
                existingEmployee = await employee.findOne({ idEmployee: newID });
            }
            const aEmploy = await employ.findOneAndUpdate(
                { _id: employ.id },
                {
                    status: "Đã đạt",
                    idEmployee: newID
                },
                { new: true }
            );
            return res.status(200).json(aEmploy);
        } catch (error) {
            return res.status(500).json(error);
        }
    },

    excelAddNewEmploy: async (req, res) => {
        try {
            var Employ = req.body;
            for (const item of Employ) {
                var newEmploy = new employee(item);
                var id = "TV";
                var count = 1;

                var newID = `${id}${(count).toString().padStart(2, '0')}`;
                var existingEmployee = await employee.findOne({ idEmployee: newID });

                while (existingEmployee != null) {
                    count++;
                    newID = `${id}${(count).toString().padStart(2, '0')}`;
                    existingEmployee = await employee.findOne({ idEmployee: newID });
                }

                newEmploy.idEmployee = newID;
                newEmploy.status = "Đang thử việc/ đạo tạo"
                await newEmploy.save();
            }


            return res.status(200).json("saveEmploy");

        } catch (error) {
            return res.status(500).json(error);
        }
    },
    // trialEmploy: async (req, res) => {
    //     try {
    //         const aEmploy = await employee.find({ idEmployee: "TV" });
    //         return res.status(200).json(aEmploy);
    //     } catch (error) {
    //         return res.status(500).json(error);
    //     }
    // },
};

module.exports = employController;

async function removeVietnameseDiacritics(str) {
    return await str.normalize('NFD').replace(/[\u0300-\u036f]/g, '').replace(/đ/g, 'd').replace(/Đ/g, 'D');
}

async function employInRole(user) {
    if( user == "admin"){
        const employALL = await employee.find()
        return employALL;
    }
    const aBranch = await branch.findOne({ idBranch: user});
    if (!aBranch) {
        return "not found";
    }
    var elpoyeeIn =[];
    for (let i = 0; i < aBranch.departments.length; i++){
        employs = await employee.find({department : aBranch.departments[i]});
        elpoyeeIn = elpoyeeIn.concat(employs);
    }
    return elpoyeeIn;
}