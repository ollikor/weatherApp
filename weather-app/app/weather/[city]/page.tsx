import { Suspense } from "react"
import { getForecast } from "../../services/weather"
import Image from "next/image"

async function Forecast({ params }: { params: Promise<{ city: string }> }) {
    const { city } = await params
    const data = await getForecast(decodeURIComponent(city))
    console.log(data)

    if (data === null) {
        return <p>City is not found.</p>
    }

    const getDayKey = (dt: number) =>
        new Date((dt + data.city.timezone) * 1000).toISOString().slice(0, 10)

    const formatDay = (key: string) =>
        new Date(key).toLocaleDateString("fi-FI", {
            weekday: "long",
            day: "numeric",
            month: "numeric"
        })

    const formatTime = (dt: number) =>
        new Date((dt + data.city.timezone) * 1000).toLocaleTimeString("fi-FI", {
            timeZone: "UTC",
            hour: "2-digit",
            minute: "2-digit"
        })

    const days = [...new Set(data.list.map((item) => getDayKey(item.dt)))]
    console.log("days", days)
    return (
        <div className="flex flex-col w-full max-w-2xl mx-auto p-8">
            {days.map((day) =>
                <section key={day} className="bg-sky-200">
                    <h2>{formatDay(day)}</h2>
                    <table className="w-full text-center">
                        <thead>
                            <tr>
                                <th className="p-2">aika</th>
                                <th className="p-2">sää</th>
                                <th className="p-2">lämpö</th>
                                <th className="p-2">tuntuu kuin</th>
                            </tr>
                        </thead>
                        <tbody>
                            {data.list
                                .filter((item) => getDayKey(item.dt) === day)
                                .map((item) => (
                                    <tr className="bg-sky-400" key={item.dt}>
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
                                                    {item.main.temp} °C
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
                </section>
            )}
        </div>
    )
}

export default function WeatherPage({
    params,
}: {
    params: Promise<{ city: string }>
}) {
    return (
        <Suspense fallback={<p>Loading weather...</p>}>
            <Forecast params={params} />
        </Suspense>
    )
}