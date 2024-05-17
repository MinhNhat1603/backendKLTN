const fs = require('fs');
const path = require('path');

const employee = require("../models/employeesModel");
const ExcelJS = require('exceljs');
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
            newEmploy.status = "Đang thử việc/ đạo tạo"
            const saveEmploy = await newEmploy.save();
            res.status(200).json(saveEmploy);
        } catch (error) {
            res.status(500).json(error);
        }
    },
    //GET ALL employ
    getAllEmploy: async (req, res) => {
        try {
            const employALL = await employee.find();
            res.status(200).json(employALL);
        } catch (error) {
            res.status(500).json(error);
        }
    },
    //GET A employ
    getAEmploy: async (req, res) => {
        try {
            const aEmploy = await employee.findOne({ idEmployee: req.params.id });
            res.status(200).json(aEmploy);
        } catch (error) {
            res.status(500).json(error);
        }
    },
    //UPDATE employ
    updateEmploy: async (req, res) => {
        try {
            const employ = await employee.findOne({ idEmployee: req.params.id });
            await employ.updateOne({ $set: req.body });
            res.status(200).json("Update successfully!");
        } catch (error) {
            res.status(500).json(error);
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
            res.status(200).json("Update successfully!");
        } catch (error) {
            res.status(500).json(error);
        }
    },
    employAcheieved: async (req, res) => {
        try {
            const employ = await employee.findOne({ idEmployee: req.params.id });
            const fullName = employ.name;
            const words = fullName.split(' ');

            const initials = words.map(word => word.charAt(0).toUpperCase());

            var id = initials.join('');
            var count = 1;

            var newID = `${id}${(count).toString().padStart(2, '0')}`;
            var existingEmployee = await employee.findOne({ idEmployee: newID });

            while (existingEmployee != null) {
                count++;
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

    templateAddNewEmploy: async (req, res) => {
        try {
            // const rowHeaders = ['STT', 'Họ và tên', 'Ngày sinh', 'Giới tính', 'Phone', 'Email', 'CCCD', 'Mã BHXH', 'Vị trí', 'Phòng ban'];

            // const workbook = new ExcelJS.Workbook();
            // const worksheet = workbook.addWorksheet('Sheet1');

            // // Thêm tiêu đề công ty vào dòng đầu tiên
            // worksheet.addRow(['Công ty cổ phần Vùng trời thông tin']);
            // worksheet.addRow([]); // Thêm một dòng trống phân cách
            // // Thêm tiêu đề cột vào tệp Excel
            // worksheet.addRow(rowHeaders);

            // // Đặt độ rộng cho từng cột
            // worksheet.columns.forEach((column, index) => {
            //     column.width = rowHeaders[index].length < 12 ? 12 : rowHeaders[index].length;
            // });

            // Tạo một tệp Excel tạm thời
            // const filePath = '../temp/a.xlsx';

            const filePath = path.join(__dirname, '../resource/a.xlsx');
            // await workbook.xlsx.writeFile(filePath);

            // Trả về tệp Excel cho máy khách
            res.writeHead(200, {
                'Content-Type': 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
                'Content-Disposition': 'attachment; filename=excel_with_predefined_headers.xlsx',
            });
            const readStream = fs.createReadStream(filePath);
            readStream.pipe(res);

            // readStream.on('end', () => {
            //     // Sau khi gửi xong, đóng stream và xoá tệp Excel tạm thời
            //     readStream.close();
            //     fs.unlinkSync(filePath);
            // });

        } catch (error) {
            res.status(500).json(error);
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

            
            res.status(200).json("saveEmploy");

        } catch (error) {
            res.status(500).json(error);
        }
    },
    trialEmploy: async (req, res) => {
        try {
            const aEmploy = await employee.find({ idEmployee: "TV" });
            res.status(200).json(aEmploy);
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
