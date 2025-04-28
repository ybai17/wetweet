export function ConvertMonth(month) {
    switch (month) {
        case 0:
            return "January";
        case 1:
            return"February";
        case 2:
            return"March";
        case 3:
            return"April";
        case 4:
            return"May";
        case 5:
            return"June";
        case 6:
            return"July";
        case 7:
            return"August";
        case 8:
            return"September";
        case 9:
            return"October";
        case 10:
            return"November";
        case 11:
            return"December";
    }
}

export function ConvertDayOfWeek(day) {
    switch (day) {
        case 0:
            return "Sunday";
        case 1:
            return "Monday";
        case 2:
            return "Tuesday";
        case 3:
            return "Wednesday";
        case 4:
            return "Thursday";
        case 5:
            return "Friday";
        case 6:
            return "Saturday";
    }
}

export function ConvertDateTime(dateTimeString) {
    let date = new Date(dateTimeString);
    
    let convertedDate = {
        year: date.getFullYear(),
        month: ConvertMonth(date.getMonth()),
        date: date.getDate(),
    }

    let convertedTime = dateTimeString.slice(11, 16);

    return {
        date: convertedDate,
        time: convertedTime,
    }
}