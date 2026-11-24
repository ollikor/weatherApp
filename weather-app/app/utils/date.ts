export const getDayKey = (dt: number, timezone: number) =>
    new Date((dt + timezone) * 1000).toISOString().slice(0, 10)

export const formatTime = (dt: number, timezone: number) =>
    new Date((dt + timezone) * 1000).toLocaleTimeString("en-GB", {
        timeZone: "UTC",
        hour: "2-digit",
        minute: "2-digit"
    })

export const formatDay = (day: string, withWeekday = true) => {
    const date = new Date(day)

    const fullDate = date.toLocaleDateString("fi-FI", {
        timeZone: "UTC",
        day: "numeric",
        month: "numeric",
        year: "numeric"
    })

    if (!withWeekday) return fullDate

    const weekday = date.toLocaleDateString("en-GB", {
        timeZone: "UTC",
        weekday: "short"
    })

    return `${weekday} ${fullDate}`

}