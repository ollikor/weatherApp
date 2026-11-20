"use client"

import { useState } from "react"
import Image from "next/image"
import type { Forecast } from "../types"

export default function ForecastTabs({ data }: { data: Forecast }) {

    const getDayKey = (dt: number) =>
        new Date((dt + data.city.timezone) * 1000).toISOString().slice(0, 10)

    const formatDay = (day: string, withWeekday = true) => {
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

    const formatTime = (dt: number) =>
        new Date((dt + data.city.timezone) * 1000).toLocaleTimeString("en-GB", {
            timeZone: "UTC",
            hour: "2-digit",
            minute: "2-digit"
        })

    const days = [...new Set(data.list.map((item) => getDayKey(item.dt)))]
    const [selected, setSelected] = useState(days[0])
    return (
        <div className="flex flex-col w-full max-w-2xl mx-auto pt-8 pb-8">
            <p className="p-2">{`${data.city.name} (${data.city.country.toLowerCase()}) ${formatDay(days[0], false)} - ${formatDay(days.at(-1)!, false)}`}</p>
            <div className="flex flex-row gap-2 mt-2">
                <div>
                </div>
                {
                    days.map((day) =>
                        <button
                            onClick={() => setSelected(day)}
                            key={day}
                            className={`flex items-center justify-center h-8 w-8 
                            rounded-full capitalize
                            hover:bg-sky-200 
                            hover:text-black
                            shadow
                            transition ${day === selected
                                    ? "bg-sky-200"
                                    : "bg-gray-600 text-white"
                                }`}
                        >
                            {formatDay(day).slice(0, 2)}
                        </button>
                    )
                }
            </div>
            <table className="w-full text-center mt-2">
                <thead>
                    <tr>
                        <th className="p-2">Time</th>
                        <th className="p-2">Weather</th>
                        <th className="p-2">Temp</th>
                        <th className="p-2">Feels like</th>
                    </tr>
                </thead>
                <tbody>
                    {
                        data.list
                            .filter((item) => getDayKey(item.dt) === selected)
                            .map((item) => (
                                <tr className="bg-sky-200 m-5" key={item.dt}>
                                    <td>{formatTime(item.dt)}</td>
                                    <td>
                                        <Image
                                            className="mx-auto"
                                            src={`https://openweathermap.org/img/wn/${item.weather[0].icon}@2x.png`}
                                            alt={item.weather[0].description}
                                            width={60}
                                            height={60}
                                            loading="eager"
                                        />
                                    </td>
                                    <td>
                                        <div>
                                            <p>
                                                {Math.round(item.main.temp)} °C
                                            </p>
                                            <p>
                                                {item.weather[0].description}
                                            </p>
                                        </div>
                                    </td>
                                    <td>{item.main.feels_like} °C</td>
                                </tr>
                            )
                            )}
                </tbody>
            </table>
        </div>
    )
}