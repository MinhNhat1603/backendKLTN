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

const paySlipController = {
    //ADD USER
    calculationPaySlip: async (req, res) => {
        try {
            const aBranch = await branch.findOne({ idBranch: req.params.id });
            if (!aBranch) {
                return res.status(404).json({ message: "Branch not found" });
            }
            var elpoyeeIn = [];
            for (let i = 0; i < aBranch.departments.length; i++) {
                employs = await employee.find({ department: aBranch.departments[i] });
                elpoyeeIn = elpoyeeIn.concat(employs);
            }
            const time = new Date();
            for (const item of elpoyeeIn) {
                const newPaySlip = calEmployPaySlip(item, time);
                await newPaySlip.save();
            }

            res.status(200).json("Đã xong");

        } catch (error) {
            res.status(500).json(error);
        }
    },
    recalculateAEmploy: async (req, res) => {
        try {
            const apaySlip = await paySlip.findOne({ idPaySlip: req.params.id })
            if (!apaySlip) {
                return res.status(404).json({ message: "Pay slip not found" });
            }
            const employ = await employee.findOne({ idEmployee: apaySlip.employee });
            if (!employ) {
                return res.status(404).json({ message: "Employee not found" });
            }

            const newPaySlip = calEmployPaySlip(employ)
            const updatedPaySlip = await paySlip.findOneAndUpdate(
                { idPaySlip: req.params.id },
                newPaySlip,
                { new: true } // Trả về tài liệu sau khi cập nhật
            );

            res.status(200).json(updatedPaySlip);

        } catch (error) {
            res.status(500).json(error);
        }
    },

    recalculateAllEmploy: async (req, res) => {
        try {

            const aBranch = await branch.findOne({ idBranch: req.params.id });
            if (!aBranch) {
                return res.status(404).json({ message: "Branch not found" });
            }
            var elpoyeeIn = [];
            for (let i = 0; i < aBranch.departments.length; i++) {
                employs = await employee.find({ department: aBranch.departments[i] });
                elpoyeeIn = elpoyeeIn.concat(employs);
            }
            for (const item of elpoyeeIn) {
                const newPaySlip = calEmployPaySlip(item);
                await newPaySlip.save();
            }


            const apaySlip = await paySlip.findOne({ idPaySlip: req.params.id })
            if (!apaySlip) {
                return res.status(404).json({ message: "Pay slip not found" });
            }
            const employ = await employee.findOne({ idEmployee: apaySlip.employee });
            if (!employ) {
                return res.status(404).json({ message: "Employee not found" });
            }

            const newPaySlip = calEmployPaySlip(employ)
            const updatedPaySlip = await paySlip.findOneAndUpdate(
                { idPaySlip: req.params.id },
                newPaySlip,
                { new: true } // Trả về tài liệu sau khi cập nhật
            );

            res.status(200).json(updatedPaySlip);

        } catch (error) {
            res.status(500).json(error);
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
            res.status(200).json("Update successfully!");
        } catch (error) {
            res.status(500).json(error);
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
            res.status(200).json("Update successfully!");
        } catch (error) {
            res.status(500).json(error);
        }
    },

    //Các bảng lương theo status
    getPaySlipbyStatus: async (req, res) => {
        try {
            const paySlips = await paySlip.find({ status: req.body.status });
            res.status(200).json(paySlips);
        } catch (error) {
            res.status(500).json(error);
        }
    },
    

    getApaySlip: async (req, res) => {
        try {
            const apaySlip = await paySlip.findOne({ idPaySlip: req.params.id });
            res.status(200).json(apaySlip);
        } catch (error) {
            res.status(500).json(error);
        }
    },
    // dataCollection:async (req, res)=>{
    //     try  {
    //         const time = new Date();
    //         const year = time.getFullYear();
    //         const month = time.getMonth();
    //         const firstDay = new Date(year, month, 1, 0, 0, 0)
    //         const lastDay = new Date(year, month, totalDays, 0, 0, 0);

    //         const employ = await employee.findOne({idEmployee: req.params.id});
    //         const aPosition =await position.findOne({title: employ.position});
    //         const aInsurance = await insurance.findOne({
    //             employee: employ.idEmployee,
    //             year: year,
    //             month: month
    //         });
    //         const aContract = await contract.findOne({
    //             idContract : employ.contract,
    //             employee: employ.idEmployee
    //         });
    //         const atimeSheets = await timeSheet.find({
    //             employee: employ.idEmployee,
    //             year: year,
    //             month: month
    //         });
    //         const decisions = await decision.find({
    //             employee: employ.idEmployee,
    //             year: year,
    //             month: month
    //         });
    //         const advanceRqs = await advanceRq.fin({
    //             employee: employ.idEmployee,
    //             year: year,
    //             month: month,
    //             status:"Đã duyệt"
    //         });

    //         const leaveRq1 = await leaveRq.find({
    //             employee: employ.idEmployee,
    //             timeStart: { $lte: lastDay, $gte: firstDay },
    //             leaveRqType: "Nghỉ phép năm",
    //             status: "Đã duyệt"
    //         })
    //         const leaveRq2 = await leaveRq.find({
    //             employee: employ.idEmployee,
    //             timeEnd: { $gte: firstDay, $lte: lastDay },
    //             leaveRqType: "Nghỉ phép năm",
    //             status: "Đã duyệt"
    //         })
    //         const leaveRqs = Array.from(new Set([...leaveRq1, ...leaveRq2].map(obj => JSON.stringify(obj)))).map(str => JSON.parse(str));


    //         res.status(200).json(aPosition);
    //     } catch (error) {
    //         res.status(500).json(error);
    //     }
    // },


};

module.exports = paySlipController;

function countWorkDays(startDate, endDate) {
    let workDays = 0;

    for (let currentDay = new Date(startDate); currentDay <= endDate; currentDay.setDate(currentDay.getDate() + 1)) {
        const dayOfWeek = currentDay.getDay();
        if (dayOfWeek !== 0 && dayOfWeek !== 6) {
            workDays++;
        }
    }

    return workDays;
}

async function calEmployPaySlip(employ, time) {
    
    const year = time.getFullYear();
    const month = time.getMonth();  //Tinh tiến vào tháng sau nên không +1
    const totalDays = new Date(year, month - 1, 0).getDate();
    const firstDay = new Date(year, month, 1, 0, 0, 0)
    const lastDay = new Date(year, month, totalDays, 0, 0, 0);

    //Tính số ngày công và tăng ca từ bẳng lương
    const atimeSheets = await timeSheet.find({
        employee: employ.idEmployee,
        year: year,
        month: month
    })
    const overTime = 0;
    const workingDay = 0;
    for (const item of atimeSheets) {
        const day = new Date(year, month - 1, item.date);
        if (day === 0 || day === 6) {
            overTime += item.overTime;
            overTime += item.workday * 8;
        } else {
            overTime += item.overTime;
            workingDay += item.workday;
        }
    }
    const dayWork = workingDay;
    const paiLeave = 0;

    //Tính số ngày nhỉ phép năm có trong tháng
    const leaveRq1 = await leaveRq.find({
        employee: employ.idEmployee,
        timeStart: { $lte: lastDay, $gte: firstDay },
        leaveRqType: "Nghỉ phép năm",
        status: "Đã duyệt"
    })
    const leaveRq2 = await leaveRq.find({
        employee: employ.idEmployee,
        timeEnd: { $gte: firstDay, $lte: lastDay },
        leaveRqType: "Nghỉ phép năm",
        status: "Đã duyệt"
    })
    const leaveRqs = Array.from(new Set([...leaveRq1, ...leaveRq2].map(obj => JSON.stringify(obj)))).map(str => JSON.parse(str));
    for (const item of leaveRqs) {
        const rqStart = new Date(item.timeStart);
        const rqEnd = new Date(item.timeEnd);
        // Ngày nghỉ bắt đầu từ tháng trước
        if (rqStart.getTime() < firstDay.getTime()) {
            const daysDiff = countWorkDays(firstDay, rqEnd);
            paiLeave += daysDiff;
        } else if (rqEnd.getTime() > lastDay.getTime()) {       // Ngày nghỉ kết thúc từ tháng sau
            const daysDiff = countWorkDays(rqStart, lastDay);
            paiLeave += daysDiff;
        } else {    //Nggayf bắt đầu về kết thúca trong cùng tháng
            const daysDiff = countWorkDays(rqStart, rqEnd);
            paiLeave += daysDiff;
        }
    }
    workingDay += paiLeave;
    //Đếm số ngày làm việc tron tháng
    var dayofwork = countWorkDays(firstDay, lastDay);

    //Số ngày công nhỏ hơn số ngày làm việc trong tháng(2-6)
    var status ="Chưa kiểm tra"
    if (workingDay > dayofwork) {
        status = "Số ngày làm viêc chưa đúng"
    }

    // Tính lương theo số ngày con và tăng ca
    const workSalary = (employ.salary / dayofwork * workingDay);
    const overTimeMoney = (employ.salary / dayofwork * overTime * 2);

    //Tính lương phụ cấp hàng tháng và phụ cấp chức vụ
    const aContract = await contract.findOne({
        idContract: employ.contract
    })
    const aPosition = await position.findOne({
        title: employ.position
    })

    //Tien thưởng/phạt trong tháng
    const decisions = await decision.find({
        employee: employ.idEmployee,
        year: year,
        month: month
    })
    var totalDecision = 0;
    for (const item of decisions) {
        totalDecision += item.money
    }

    // Tính số tiền bảo hiểm
    const aInsurance = await insurance.findOne({
        employee: employ.idEmployee,
        year: year,
        month: month
    })

    //Tiền lương ứng trước
    const advanceRqs = await advanceRq.find({
        employee: employ.idEmployee,
        year: year,
        month: month,
        status: "Đã duyệt"
    })
    const totalAdvance = 0;
    for (const item of advanceRqs) {
        totalAdvance += item.money
    }

    const totalSalary = workSalary + overTimeMoney + aContract.allowance + aPosition.allowance + totalDecision + aInsurance.employeePay + totalAdvance;
    const idPaySlip = `${year}/${month}-${employ.idEmployee}`
    const newPaySlip = new paySlip({
        idPaySlip: idPaySlip,
        employee: employ.idEmployee,
        year: year,
        month: month,
        salary: employ.salary,
        insurance: aInsurance.employeePay,
        overTIme: overTime,
        overTimeMoney: overTimeMoney,
        decisionMoney: totalDecision,
        positionAllowance: aPosition.allowance,
        workDay: dayWork,
        workSalary: workSalary,
        paiLeave: paiLeave,
        advanceMoney: totalAdvance,
        totalSalary: totalSalary,
        status: status
    })
    return newPaySlip
}