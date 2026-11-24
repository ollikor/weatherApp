import { Suspense } from "react"
import { getForecast } from "../../services/weather"
import ForecastTabs from "../../components/ForecastTabs"
import ForecastLoading from "../../components/ForecastLoading"

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
}) 
{
    return (
        <main>
            <Suspense fallback={<ForecastLoading />}>
                <Forecast params={params} />
            </Suspense>
        </main>
    )
}