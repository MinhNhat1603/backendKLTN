
const timeSheet = require("../models/timeSheetModel");
const employee = require("../models/employeesModel");
const { update } = require("./departmentController");
const timeSheetController = {
    //CheckIn
    checkeIn: async (req,  res) => {
        try {
            const acurrentDate = new Date();
            const year = acurrentDate.getFullYear();
            const month = acurrentDate.getMonth() + 1; // Tháng bắt đầu từ 0, nên cộng thêm 1
            const day = acurrentDate.getDate();
            const currentDate = new Date(year, month - 1, day, 7, 30, 0);
            //const currentDate = new Date();
            // const year = currentDate.getFullYear();
            // const month = currentDate.getMonth() + 1; // Tháng bắt đầu từ 0, nên cộng thêm 1
            // const day = currentDate.getDate();
            const limit =  new Date(year, month - 1, day, 14, 0, 0);

            var aTimesheet = await timeSheet.findOne({
                employee: req.params.id,
                year: year,
                month: month,
                date: day
            })
            if (aTimesheet === null) {
                if(limit.getTime() < currentDate.getTime()){
                    return res.status(200).json("Đã quá giờ checkIn");
                }else{
                    aTimesheet = new timeSheet({
                        employee: req.params.id,
                        year: year,
                        month: month,
                        date: day,
                        checkIn: currentDate
                    })
                    const saveTimeSheet = await aTimesheet.save();
                    return res.status(200).json(saveTimeSheet);
                }
            }else{
                return res.status(200).json("Đã checkin hôm nay");
            }    
        } catch (error) {
            return res.status(500).json(error);
        }
    },

    //CheckOut
    checkOut: async (req,  res) => {
        try {
            const currentDate = new Date();
            const year = currentDate.getFullYear();
            const month = currentDate.getMonth() + 1; // Tháng bắt đầu từ 0, nên cộng thêm 1
            const day = currentDate.getDate();
            const aTimesheet = await timeSheet.findOne({
                employee: req.params.id,
                year: year,
                month: month,
                date: day
            });
            if (!aTimesheet) {
                return  res.status(200).json("Chưa checkIn");
            }
            var timeIn = new Date(year, month - 1, day, 8, 0, 0);
            var timeOut = new Date(year, month - 1, day, 17, 0, 0);
            const lunchStart = new Date(year, month - 1, day, 12, 0, 0);
            const lunchEnd = new Date(year, month - 1, day, 13, 0, 0);
            const checkIn = new Date(aTimesheet.checkIn);
            var overTime = 0;
            if (currentDate.getTime() > timeOut.getTime()) {
                overTime = Math.abs(currentDate.getTime() - timeOut.getTime());
                overTime = (overTime / (1000 * 60 * 60)).toFixed(2);
                if (overTime < 0.5) {
                    overTime = 0;
                }
            }
    
            if (timeIn.getTime() <= checkIn.getTime()) {
                timeIn = checkIn;
            }
            if (currentDate.getTime() <= timeOut.getTime()) {
                timeOut = currentDate;
            }
            var workday = Math.abs(timeIn.getTime() - timeOut.getTime());
            workday = ((workday / (1000 * 60 * 60)) - 1).toFixed(2);
            if (timeIn.getTime() < lunchStart.getTime() && timeOut.getTime() < lunchStart.getTime()) {
                workday++;
            }
            if (timeIn.getTime() > lunchEnd.getTime()) {
                workday++;
            }
            workday = (workday/8).toFixed(2);
            await aTimesheet.updateOne({
                checkOut: currentDate,
                workday: workday,
                overTime: overTime
            });
            const newTimesheet = await timeSheet.findOne({
                employee: req.params.id,
                year: year,
                month: month,
                date: day
            });
            return res.status(200).json(newTimesheet);
        } catch (error) {
            return res.status(500).json(error);
        }
    },
    updateTimeSheet:async (req, res)=>{
        try {
            const aTimesheet = await timeSheet.findOne({
                employee: req.params.id,
                year: year,
                month: month,
                date: day
            });
            await aTimesheet.updateOne({$set: req.body});
            res.status(200).json("Update successfully!");
        } catch (error) {
            res.status(500).json(error);
        }
    },
    getAtimeSheet: async (req, res)=>{
        try {
            const aTimesheet = await timeSheet.findOne({
                employee: req.params.id,
                year: req.body.year,
                month: req.body.month,
                date: req.body.day
            });
            if(aTimesheet ===null){
                const status = req.params.id +"không check in hôm đó";
                res.status(200).json(status);
            }else{
                res.status(200).json(aTimesheet);
            }
        } catch (error) {
            res.status(500).json(error);
        }
    },
    addTimeSheet: async (req, res)=>{
        try {
            const aTimeSheet = new timeSheet(req.body);
            const saveTimeSheet = await aTimeSheet.save();
            res.status(200).json(saveTimeSheet);
        } catch (error) {
            res.status(500).json(error);
        }
    },
    
    deleteTimeSheet: async (req, res)=>{
        try {
            const aTimeSheet = await timeSheet.findOneAndDelete({
                employee: req.body.employee,
                year: req.body.year,
                month: req.body.month,
                date: req.body.date,
            });
            res.status(200).json("Delete successfully!");
        } catch (error) {
            res.status(500).json(error);
        }
    },
    getTimeSheetInMonth:async (req, res)=>{
        try {
            const aTimesheet = await timeSheet.findOne({
                employee: req.params.id,
                year: req.body.year,
                month: req.body.month
            });
            if(aTimesheet ===null){
                const status = req.params.id +"không check in hôm đó";
                res.status(200).json(status);
            }else{
                res.status(200).json(aTimesheet);
            }
        } catch (error) {
            res.status(500).json(error);
        }
    }
    

};

module.exports = timeSheetController;