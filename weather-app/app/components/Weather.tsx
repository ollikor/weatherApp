import Link from "next/link"
import Image from "next/image"
import { getWeather } from "../services/weather"

export default async function Weather({ searchParams, defaultCity }: {
	searchParams: Promise<{ city?: string }>
	defaultCity?: string
}) {
	const { city: searched } = await searchParams
	const city = searched ?? defaultCity
	if (!city) return null
	const data = await getWeather(city)

	if (data === null) {
		return <p>City is not found.</p>
	}

	return (
		<div className="flex flex-col items-center justify-center h-full">
			<Link className="underline hover:scale-110" href={`/weather/${encodeURIComponent(`${data.name},${data.sys.country}`)}`}>{data.name}</Link>
			<p>{Math.round(data.main.temp)} °C</p>
			<Image
				src={`https://openweathermap.org/img/wn/${data.weather[0].icon}@2x.png`}
				alt={data.weather[0].description}
				width={60}
				height={60}
				loading="eager"
			/>
		</div>
	)
}