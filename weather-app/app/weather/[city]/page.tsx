import { Suspense } from "react"
import { getWeather } from "../../services/weather"

async function Weather({ params }: { params: Promise<{ city: string }>}) {
    const { city } = await params
    const data = await getWeather(city)
    if (data === null) {
        return <p>City is not found.</p>
    }

    return(
        <div>
            <h1>{data.name}</h1>
            <p>{data.main.temp}</p>
            <p>{data.weather[0].description}</p>
        </div>
    )
}

export default function WeatherPage({
    params,
}: {
    params: Promise<{ city: string }>
}) {
    return(
        <Suspense fallback={<p>Loading weather...</p>}>
            <Weather params={params} />
        </Suspense>
    )
}