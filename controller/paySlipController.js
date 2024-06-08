const user = require("../models/usersModel");
const employee = require("../models/employeesModel");
const position = require("../models/positionsModel");
const insurance = require("../models/insuranceModel");
const contract = require("../models/contractsModel");
const decision = require("../models/decisionModel");
const advanceRq = require("../models/advanceRqModel");
const leaveRq = require("../models/leaveRqModel");
const paySlip = require("../models/paySlipModel");
const timeSheet = require("../models/timeSheetModel");
const branch = require("../models/branchesModel");

const excelJs = require("exceljs");

const paySlipController = {
    //ADD USER
    calculationPaySlip: async (req, res) => {
        try {
            const aBranch = await branch.findOne({ idBranch: req.params.id });
            if (!aBranch) {
                return res.status(404).json({ message: "Branch not found" });
            }

            let employeeIn = [];
            for (let i = 0; i < aBranch.departments.length; i++) {
                const employees = await employee.find({ department: aBranch.departments[i] });
                employeeIn = employeeIn.concat(employees);
            }

            const time = new Date();
            const year = time?.getFullYear() ?? new Date().getFullYear();
            const month = time?.getMonth() ?? new Date().getMonth();
            const paySlipPromises = employeeIn.map(async (item) => {
                await calEmployInSurance(item, time);
                const idPaySlip = `${year}-${month}.${item?.idEmployee}`;
                let existingPaySlip = await paySlip.findOne({idPaySlip: idPaySlip });
                if (existingPaySlip) {   //xem lai
                    await existingPaySlip.deleteOne();
                }
                const newPaySlip = await calEmployPaySlip(item, time);
                // if (existingPaySlip) {
                //     await existingPaySlip.deleteOne();
                //     await newPaySlip.save();
                // } else {
                //     await newPaySlip.save();
                // }
                await newPaySlip.save();
            });

            await Promise.all(paySlipPromises);

            return res.status(200).json("Đã xong");
        } catch (error) {
            return res.status(500).json(error);
        }
    },
    calculationAPaySlip: async (req, res) => {
        try {
            const employ = await employee.findOne({ idEmployee: req.params.id })
            const time = new Date();
            const year = time?.getFullYear() ?? new Date().getFullYear();
            const month = time?.getMonth() ?? new Date().getMonth();
            const idPaySlip = `${year}-${month}.${employ?.idEmployee}`;
            let existingPaySlip = await paySlip.findOne({ idPaySlip: idPaySlip });
            if (existingPaySlip) {
                await existingPaySlip.deleteOne()
                existingPaySlip = await calEmployPaySlip(employ, time);
                await existingPaySlip.save();
                return res.status(200).json({ message: "Pay slip updated", paySlip: existingPaySlip });
            } else {
                const newPaySlip = await calEmployPaySlip(employ, time);
                newPaySlip.idPaySlip = idPaySlip; // Ensure idPaySlip is set for the new pay slip
                await newPaySlip.save();
                return res.status(201).json({ message: "New pay slip created", paySlip: newPaySlip });
            }
        } catch (error) {
            return res.status(500).json(error);
        }
    },
    // Kế toán duyệt
    accountantCheck: async (req, res) => {
        try {
            const check = req.body.status;
            const apaySlip = await paySlip.findOne({ idPaySlip: req.params.id });
            if (check === "Duyệt") {
                await paySlip.updateOne({ status: "Kế toán đã duyệt" });
            } else {
                await paySlip.updateOne({ status: "Cần kiểm tra lại!" });
            }
            return res.status(200).json("Update successfully!");
        } catch (error) {
            return res.status(500).json(error);
        }
    },
    //Giám đốc duyệt
    directorCheck: async (req, res) => {
        try {
            const check = req.body.status;
            const apaySlip = await paySlip.findOne({ idPaySlip: req.params.id });
            if (check === "Duyệt") {
                await paySlip.updateOne({ status: "Ban giám đốc đã duyệt" });
            } else {
                await paySlip.updateOne({ status: "Cần kiểm tra lại!" });
            }
            return res.status(200).json("Update successfully!");
        } catch (error) {
            return res.status(500).json(error);
        }
    },

    //Các bảng lương theo status
    getPaySlipbyStatus: async (req, res) => {
        try {
            const paySlips = await paySlip.find({ status: req.body.status });
            return res.status(200).json(paySlips);
        } catch (error) {
            return res.status(500).json(error);
        }
    },


    getApaySlip: async (req, res) => {
        try {
            const apaySlip = await paySlip.findOne({ idPaySlip: req.params.id });
            return res.status(200).json(apaySlip);
        } catch (error) {
            return res.status(500).json(error);
        }
    },
    employHasPaySlip: async (req, res) => {
        try {
            const paySlips = await paySlip.find({ employee: req.params.id});
            return res.status(200).json(paySlips);
        } catch (error) {
            return res.status(500).json(error);
        }
    },


    dowloadExcelPaySlip: async (req, res) => {
        try {
            let workbook = new excelJs.Workbook();
            // const year = req.body.year;
            // const month = req.body.month;
            const sheet = workbook.addWorksheet("Bảng lương");
            
            sheet.columns = [
                { header: "STT", key: "stt", width: 4 },
                { header: "Mã nhân viên", key: "employee", width: 13 },
                { header: "Lương cơ bản", key: "salary", width: 13 },
                { header: "Số ngày công", key: "workDay", width: 13 },
                { header: "Nghỉ phép", key: "paiLeave", width: 10 },
                { header: "Thực nhận", key: "workSalary", width: 11 },
                { header: "Số giờ", key: "overTime", width: 10 },
                { header: "Tổng tiền", key: "overTimeMoney", width: 12 },
                { header: "Chức vụ", key: "positionAllowance", width: 8 },
                { header: "Đi lại", key: "travelAllowance", width: 8 },
                { header: "Ăn uống", key: "eatingAllowance", width: 8 },
                { header: "Thưởng/phạt", key: "decisionMoney", width: 13 },
                { header: "Tiền đã ứng", key: "advanceMoney", width: 12 },
                { header: "BHXH", key: "insurance", width: 9 },
                { header: "Tổng tiền", key: "totalSalary", width: 11 },
                { header: "Trạng thái", key: "status", width: 14 }
            ]
            sheet.insertRow(1, ["Công ty Cổ phần Vùng trời thông tin"]);
            sheet.mergeCells('A1:P1');
            sheet.getRow(1).eachCell((cell, colNumber) => {
                cell.font = {
                    bold: true,
                    size: 20, // cỡ chữ
                    color: { argb: 'FFFFA500' } // màu chữ (đen)
                };
                cell.alignment = { vertical: 'middle', horizontal: 'center' }; // căn giữa dọc và ngang
            });
            sheet.insertRow(2, ["Bảng lương tháng 4 năm 2024"]);
            sheet.mergeCells('A2:P2');
            sheet.getRow(2).eachCell((cell, colNumber) => {
                cell.font = {
                    bold: true,
                    size: 16, // cỡ chữ
                    color: { argb: 'FFFFA500' } // màu chữ (đen)
                };
            });
            
            sheet.insertRow(4);
            
            sheet.mergeCells('A3:A4');
            sheet.mergeCells('B3:B4');
            sheet.mergeCells('C3:C4');
            sheet.mergeCells('N3:N4');

            const D3= sheet.getCell('D3').value;
            const E3= sheet.getCell('E3').value;
            const F3= sheet.getCell('F3').value;
            sheet.getCell('D4').value = D3;
            sheet.getCell('E4').value = E3;
            sheet.getCell('F4').value = F3;
            sheet.mergeCells('D3:F3');
            sheet.getCell('D3').value = "Lương thực tế";

            const G3= sheet.getCell('G3').value;
            const H3= sheet.getCell('H3').value;
            sheet.getCell('G4').value = G3;
            sheet.getCell('H4').value = H3;
            sheet.mergeCells('G3:H3');
            sheet.getCell('G3').value = "Làm thêm giờ";

            const I3= sheet.getCell('I3').value;
            const J3= sheet.getCell('J3').value;
            const K3= sheet.getCell('K3').value;
            sheet.getCell('I4').value = I3;
            sheet.getCell('J4').value = J3;
            sheet.getCell('K4').value = K3;
            sheet.mergeCells('I3:K3');
            sheet.getCell('I3').value = "Các khoản phụ cấp";

            const L3= sheet.getCell('L3').value;
            const M3= sheet.getCell('M3').value;
            sheet.getCell('L4 ').value = L3;
            sheet.getCell('M4').value = M3;
            sheet.mergeCells('L3:M3');
            sheet.getCell('L3').value = "Các chi phí khác";

            sheet.getRow(3).eachCell((cell, colNumber) => {
                cell.alignment = { vertical: 'middle', horizontal: 'center' }; // căn giữa dọc và ngang
            });
            
            sheet.getRow(4).eachCell((cell, colNumber) => {
                cell.alignment = { vertical: 'middle', horizontal: 'center' }; // căn giữa dọc và ngang
            });
            
            let rowCount = 0;
            const allpaySlip = await paySlip.find();
            allpaySlip.map((val, idx) => {
                rowCount++;
                sheet.addRow({
                    stt: rowCount,
                    employee: val.employee,
                    salary: val.salary,
                    insurance: val.insurance,
                    overTime: val.overTime,
                    overTimeMoney: val.overTimeMoney,
                    decisionMoney: val.decisionMoney,
                    positionAllowance: val.positionAllowance,
                    travelAllowance: val.travelAllowance,
                    eatingAllowance: val.eatingAllowance,
                    workDay: val.workDay,
                    workSalary: val.workSalary,
                    paiLeave: val.paiLeave,
                    advanceMoney: val.advanceMoney,
                    totalSalary: val.totalSalary,
                    status: val.status
                });
            });

            sheet.getRow(3).eachCell((cell, colNumber) => {
                cell.fill = {
                    type: 'pattern',
                    pattern: 'solid',
                    fgColor: { argb: 'FFFF00' } // Màu nền vàng, bạn có thể thay đổi mã màu tùy thích
                };
                cell.font = { bold: true }; // Thêm in đậm
            });
            sheet.getRow(4).eachCell((cell, colNumber) => {
                cell.fill = {
                    type: 'pattern',
                    pattern: 'solid',
                    fgColor: { argb: 'FFFF00' } // Màu nền vàng, bạn có thể thay đổi mã màu tùy thích
                };
                cell.font = { bold: true }; // Thêm in đậm
            });

            const totalRow = {
                stt: '', // Để trống vì đây là dòng tổng
                employee: 'Tổng:', 
                salary: { formula: `SUM(C5:C${rowCount + 4})` },
                workDay: { formula: `SUM(D5:D${rowCount + 4})` },
                paiLeave: { formula: `SUM(E5:E${rowCount + 4})` },
                workSalary: { formula: `SUM(F5:F${rowCount + 4})` },  
                overTime: { formula: `SUM(G5:G${rowCount + 4})` }, 
                overTimeMoney: { formula: `SUM(H5:H${rowCount + 4})` },
                positionAllowance: { formula: `SUM(I5:I${rowCount + 4})` }, 
                travelAllowance: { formula: `SUM(J5:J${rowCount + 4})` },
                eatingAllowance: { formula: `SUM(K5:K${rowCount + 4})` }, 
                decisionMoney: { formula: `SUM(L5:L${rowCount + 4})` }, 
                advanceMoney: { formula: `SUM(M5:M${rowCount + 4})` },
                insurance: { formula: `SUM(N5:N${rowCount + 4})` }, 
                totalSalary: { formula: `SUM(O5:O${rowCount + 4})` }, 
                status: ''
            };
            
            // Thêm dòng tổng vào cuối
            const totalRowNumber = rowCount + 5; // Số dòng của dòng tổng
            sheet.addRow(totalRow);
            sheet.mergeCells(`A${totalRowNumber}:B${totalRowNumber}`);
            sheet.getCell(`A${totalRowNumber}`).value = "Tổng:";


            // Lấy hàng tổng
            const totalRowCells = sheet.getRow(totalRowNumber).values;
            totalRowCells.forEach((cell, index) => {
                const cellRef = sheet.getCell(totalRowNumber, index + 1);
                cellRef.fill = {
                    type: 'pattern',
                    pattern: 'solid',
                    fgColor: { argb: 'F5F5DC' } // Màu nền vàng, bạn có thể thay đổi mã màu tùy thích
                };
            });

            sheet.eachRow({ includeEmpty: false }, function (row, rowNumber) {
                if (rowNumber >= 3) { // Bắt đầu từ dòng thứ 3
                    row.eachCell({ includeEmpty: false }, function (cell, colNumber) {
                        cell.border = {
                            top: { style: 'thin' },
                            left: { style: 'thin' },
                            bottom: { style: 'thin' },
                            right: { style: 'thin' }
                        };
                    });
                }
            });

            
            

            // Ghi vào phản hồi
            res.writeHead(200, {
                'Content-Type': 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
                'Content-Disposition': 'attachment; filename="BangLuong.xlsx"' // Cú pháp tên tệp đã được sửa
            });

            // Ghi workbook vào phản hồi
            workbook.xlsx.write(res)
                .then(() => {
                    return res.end();
                })
                .catch(err => {
                    console.log(err);
                });
        } catch (error) {
            return res.status(500).json(error);
        }
    },


};

module.exports = paySlipController;

function countWorkDays(startDate, endDate) {
    let count = 0;
    let currentDate = new Date(startDate);
    while (currentDate <= endDate) {
        const dayOfWeek = currentDate.getDay();
        if (dayOfWeek !== 0 && dayOfWeek !== 6) {  // Ignore weekends
            count++;
        }
        currentDate.setDate(currentDate.getDate() + 1);
    }
    return count;
}

async function calEmployInSurance(employ, time){
    const companyPay = employ.salary / 100 * 21.5;
    const employeePay = employ.salary / 100 * 10.5

    const year = time?.getFullYear() ?? new Date().getFullYear();
    const month = time?.getMonth() ?? new Date().getMonth();
    const aInsurance =await insurance.findOne({
        employee: employ.idEmployee,
        year: year,
        month: month
    })
    if(!aInsurance && (aInsurance.status !== "Đã kiểm tra") || aInsurance.status !== "Đã đóng"){
        await aInsurance.deleteOne();
        const newInsurance =new insurance({
            employee : employ.idEmployee,
            isuranceCode: employ.insuranceCode,
            salaryInsurance: employ.salary,
            companyPay: companyPay,
            employeePay: employeePay,
            year: year,
            month: month,
            status: "Chưa xác nhận"
        });                
        await newInsurance.save();
    }
}
async function calEmployPaySlip(employ, time) {
    const year = time?.getFullYear() ?? new Date().getFullYear();
    const month = time?.getMonth() ?? new Date().getMonth();
    const totalDays = new Date(year, month, 0).getDate();
    const firstDay = new Date(year, month, 1, 0, 0, 0);
    const lastDay = new Date(year, month, totalDays, 0, 0, 0);

    // Tính số ngày công và tăng ca từ bảng lương
    const atimeSheets = await timeSheet.find({
        employee: employ?.idEmployee,
        year: year,
        month: month
    }) || [];

    let overTime = 0;
    let workingDay = 0;

    for (const item of atimeSheets) {
        const day = new Date(year, month, item?.date).getDay();
        if (day === 0 || day === 6) {
            overTime += item?.overTime ?? 0;
            overTime += (item?.workday ?? 0) * 8;
        } else {
            overTime += item?.overTime ?? 0;
            workingDay += item?.workday ?? 0;
        }
    }

    const dayWork = workingDay;
    let paiLeave = 0;

    // Tính số ngày nghỉ phép năm có trong tháng
    const leaveRq1 = await leaveRq.find({
        employee: employ?.idEmployee,
        timeStart: { $lte: lastDay, $gte: firstDay },
        leaveRqType: "Nghỉ phép năm",
        status: "Đã duyệt"
    }) || [];

    const leaveRq2 = await leaveRq.find({
        employee: employ?.idEmployee,
        timeEnd: { $gte: firstDay, $lte: lastDay },
        leaveRqType: "Nghỉ phép năm",
        status: "Đã duyệt"
    }) || [];

    const leaveRqs = Array.from(new Set([...leaveRq1, ...leaveRq2].map(obj => JSON.stringify(obj))))
        .map(str => JSON.parse(str));

    for (const item of leaveRqs) {
        const rqStart = new Date(item?.timeStart);
        const rqEnd = new Date(item?.timeEnd);

        if (rqStart < firstDay) {
            paiLeave += countWorkDays(firstDay, rqEnd);
        } else if (rqEnd > lastDay) {
            paiLeave += countWorkDays(rqStart, lastDay);
        } else {
            paiLeave += countWorkDays(rqStart, rqEnd);
        }
    }

    workingDay += paiLeave;
    const dayofwork = countWorkDays(firstDay, lastDay);

    let status = "Chưa kiểm tra";
    if (workingDay > dayofwork) {
        status = "Số ngày làm việc chưa đúng";
    }

    let workSalary = ((employ?.salary ?? 0) / dayofwork * workingDay).toFixed(0);
    workSalary = Math.round(workSalary / 1000) * 1000;
    let overTimeMoney = (((employ?.salary ?? 0) / dayofwork) / 8 * overTime * 2).toFixed(0);
    overTimeMoney = Math.round(overTimeMoney / 1000) * 1000;

    const aContract = await contract.findOne({
        idContract: employ?.contract
    }) || {};

    const aPosition = await position.findOne({
        title: employ?.position
    }) || {};

    const decisions = await decision.find({
        employee: employ?.idEmployee,
        year: year,
        month: month
    }) || [];

    let totalDecision = decisions.reduce((sum, item) => sum + (item?.money ?? 0), 0);

    const aInsurance = await insurance.findOne({
        employee: employ?.idEmployee,
        year: year,
        month: month
    }) || {};

    const advanceRqs = await advanceRq.find({
        employee: employ?.idEmployee,
        year: year,
        month: month,
        status: "Đã duyệt"
    }) || [];

    let totalAdvance = advanceRqs.reduce((sum, item) => sum + (item?.money ?? 0), 0);

    const totalSalary = (parseFloat(workSalary) || 0) + (parseFloat(overTimeMoney) || 0) + 
        (aContract?.eatingAllowance ?? 0) + (aContract?.travelAllowance ?? 0) + 
        (aPosition?.allowance ?? 0) + totalDecision - 
        (aInsurance?.employeePay ?? 0) + totalAdvance;

    const idPaySlip = `${year}-${month}.${employ?.idEmployee}`;
    const newPaySlip = new paySlip({
        idPaySlip: idPaySlip,
        employee: employ?.idEmployee,
        year: year,
        month: month,
        salary: employ?.salary ?? 0,
        insurance: aInsurance?.employeePay ?? 0,
        overTime: overTime,
        overTimeMoney: overTimeMoney,
        decisionMoney: totalDecision,
        positionAllowance: aPosition?.allowance ?? 0,
        eatingAllowance: aContract?.eatingAllowance ?? 0,
        travelAllowance: aContract?.travelAllowance ?? 0,
        workDay: dayWork,
        workSalary: workSalary,
        paiLeave: paiLeave,
        advanceMoney: totalAdvance,
        totalSalary: totalSalary,
        status: status
    });

    return newPaySlip;
}



// let workbook = new excelJs.Workbook();
//             // const year = req.body.year;
//             // const month = req.body.month;
//             const sheet = workbook.addWorksheet("Bảng lương");
            
//             sheet.columns = [
//                 { header: "STT", key: "stt", width: 4 },
//                 { header: "Mã nhân viên", key: "employee", width: 13 },
//                 { header: "Lương cơ bản", key: "salary", width: 13 },
//                 { header: "Số ngày công", key: "workDay", width: 13 },
//                 { header: "Nghỉ phép", key: "paiLeave", width: 10 },
//                 { header: "Lương thực tế", key: "workSalary", width: 13 },
//                 { header: "Tăng ca(H)", key: "overTime", width: 10 },
//                 { header: "Tăng ca(Vnđ)", key: "overTimeMoney", width: 12 },
//                 { header: "Chức vụ", key: "positionAllowance", width: 8 },
//                 { header: "Đi lại", key: "travelAllowance", width: 8 },
//                 { header: "Ăn uống", key: "eatingAllowance", width: 8 },
//                 { header: "Thưởng/phạt", key: "decisionMoney", width: 13 },
//                 { header: "Tiền đã ứng", key: "advanceMoney", width: 12 },
//                 { header: "BHXH", key: "insurance", width: 9 },
//                 { header: "Tổng tiền", key: "totalSalary", width: 11 },
//                 { header: "Trạng thái", key: "status", width: 14 }
//             ]
//             sheet.insertRow(1, ["Công ty Cổ phần Vùng trời thông tin"]);
//             sheet.mergeCells('A1:P1');
//             sheet.getRow(1).eachCell((cell, colNumber) => {
//                 cell.font = {
//                     bold: true,
//                     size: 20, // cỡ chữ
//                     color: { argb: 'FFFFA500' } // màu chữ (đen)
//                 };
//                 cell.alignment = { vertical: 'middle', horizontal: 'center' }; // căn giữa dọc và ngang
//             });
//             sheet.insertRow(2, ["Bảng lương tháng 4 năm 2024"]);
//             sheet.mergeCells('A2:P2');
//             sheet.getRow(2).eachCell((cell, colNumber) => {
//                 cell.font = {
//                     bold: true,
//                     size: 16, // cỡ chữ
//                     color: { argb: 'FFFFA500' } // màu chữ (đen)
//                 };
//             });
            

            
//             let rowCount = 0;
//             const allpaySlip = await paySlip.find();
//             allpaySlip.map((val, idx) => {
//                 rowCount++;
//                 sheet.addRow({
//                     stt: rowCount,
//                     employee: val.employee,
//                     salary: val.salary,
//                     insurance: val.insurance,
//                     overTime: val.overTime,
//                     overTimeMoney: val.overTimeMoney,
//                     decisionMoney: val.decisionMoney,
//                     positionAllowance: val.positionAllowance,
//                     travelAllowance: val.travelAllowance,
//                     eatingAllowance: val.eatingAllowance,
//                     workDay: val.workDay,
//                     workSalary: val.workSalary,
//                     paiLeave: val.paiLeave,
//                     advanceMoney: val.advanceMoney,
//                     totalSalary: val.totalSalary,
//                     status: val.status
//                 });
//             });

//             sheet.getRow(4).eachCell((cell, colNumber) => {
//                 cell.fill = {
//                     type: 'pattern',
//                     pattern: 'solid',
//                     fgColor: { argb: 'FFFF00' } // Màu nền vàng, bạn có thể thay đổi mã màu tùy thích
//                 };
//                 cell.font = { bold: true }; // Thêm in đậm
//             });
//             sheet.eachRow({ includeEmpty: false }, function (row, rowNumber) {
//                 if (rowNumber >= 3) { // Bắt đầu từ dòng thứ 3
//                     row.eachCell({ includeEmpty: false }, function (cell, colNumber) {
//                         cell.border = {
//                             top: { style: 'thin' },
//                             left: { style: 'thin' },
//                             bottom: { style: 'thin' },
//                             right: { style: 'thin' }
//                         };
//                     });
//                 }
//             });
            

//             // Ghi vào phản hồi
//             return res.writeHead(200, {
//                 'Content-Type': 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
//                 'Content-Disposition': 'attachment; filename="BangLuong.xlsx"' // Cú pháp tên tệp đã được sửa
//             });

//             // Ghi workbook vào phản hồi
//             workbook.xlsx.write(res)
//                 .then(() => {
//                     return res.end();
//                 })
//                 .catch(err => {
//                     console.log(err);
//                 });