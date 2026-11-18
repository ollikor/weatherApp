import { Suspense } from "react"
import { getWeather } from "../../services/weather"
import Image from "next/image"

async function Weather({ params }: { params: Promise<{ city: string }>}) {
    const { city } = await params
    const data = await getWeather(city)
    console.log(data)

    if (data === null) {
        return <p>City is not found.</p>
    }

    return(
        <div>
            <h1>{data.name}</h1>
            <p>Temperature: {data.main.temp}</p>
            <p>Max temperature: {data.main.temp_max}</p>
            <p>Min temperature: {data.main.temp_min}</p>
            <p>Wind speed: {data.wind.speed}</p>
            <p>Feels like: {data.main.feels_like}</p>
            <p>{data.weather[0].description}</p>
            <Image 
                src={`https://openweathermap.org/img/wn/${data.weather[0].icon}@2x.png`}
                alt={data.weather[0].description}
                width={60}
                height={60}
            />
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