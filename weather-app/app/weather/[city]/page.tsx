import { Suspense } from "react"
import { getForecast } from "../../services/weather"
import ForecastTabs from "../../components/forecastTabs"

async function Forecast({ params }: { params: Promise<{ city: string }> }) {
    const { city } = await params
    const data = await getForecast(decodeURIComponent(city))

    if (data === null) return <p>City is not found.</p>

    return <ForecastTabs data={data} />    
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