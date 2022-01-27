const months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"]


interface TwelveHourData {
    hour: number
    text: string
}

function _getTwelveHourData(hour: number): TwelveHourData {
    if (hour > 12) {
        return {
            hour: hour - 12,
            text: "PM"
        }
    }
    return {
        hour: hour,
        text: "AM"
    }
}

export interface MessageTime {
    year: number
    month: string
    day: number
    hour: number
    minute: number
    second: number
    twelveHourText: string
}



export function getDateTime(unixTimestamp: number): MessageTime {
    const date = new Date(unixTimestamp);
    const twelveHourData = _getTwelveHourData(date.getHours())

    return {
        year: date.getFullYear(),
        month: months[date.getMonth()],
        day: date.getDate(),
        hour: twelveHourData.hour,
        minute: date.getMinutes(),
        second: date.getSeconds(),
        twelveHourText: twelveHourData.text
    }
}
