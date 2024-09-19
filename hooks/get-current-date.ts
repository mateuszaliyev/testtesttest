const dayNames = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday']

export const getCurrentDate = () => {
    const date = new Date();
    
    const currentYear = date.getFullYear();
    const currentMonth = date.getMonth() + 1;
    const currentDay = date.getDate();
    const currentDayName = dayNames[date.getDay()-1];

    return {
        dayName: currentDayName,
        day: currentDay,
        month: currentMonth,
        year: currentYear,
    }
}