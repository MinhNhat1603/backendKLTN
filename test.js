function countWeekendDays(startDate, endDate) {
    let weekendDays = 0;

    // Loop qua mỗi ngày trong khoảng thời gian
    for (let currentDay = new Date(startDate); currentDay <= endDate; currentDay.setDate(currentDay.getDate() + 1)) {
        const dayOfWeek = currentDay.getDay();
        // Nếu là Chủ Nhật (0) hoặc thứ Bảy (6) thì tăng biến đếm
        if (dayOfWeek !== 0 && dayOfWeek !== 6) {
            weekendDays++;
        }
    }

    return weekendDays;
}

const startDate1 = new Date("2024-05-01"); // Ngày bắt đầu của khoảng thời gian thứ nhất
const endDate1 = new Date("2024-05-31");   // Ngày kết thúc của khoảng thời gian thứ nhất
const startDate2 = new Date("2024-06-01"); // Ngày bắt đầu của khoảng thời gian thứ hai
const endDate2 = new Date("2024-06-15");   // Ngày kết thúc của khoảng thời gian thứ hai

const weekendDays1 = countWeekendDays(startDate1, endDate1);
const weekendDays2 = countWeekendDays(startDate2, endDate2);
console.log(weekendDays1)