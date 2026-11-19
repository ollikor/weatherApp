import { Suspense } from "react";
import Link from "next/link"
import Image from "next/image"
import SearchForm from "./components/searchForm";
import { getWeather } from "./services/weather"

async function Weather({ searchParams }: { searchParams: Promise<{ city?: string }> }) {
	const { city } = await searchParams
	if (!city) return null
	const data = await getWeather(city)
	console.log(data)

	if (data === null) {
		return <p>City is not found.</p>
	}

	return (
		<div className="flex flex-col items-center justify-center h-full">
			<Link className="underline hover:scale-110" href={`/weather/${encodeURIComponent(`${data.name},${data.sys.country}`)}`}>{data.name}</Link>
			<p>{data.main.temp} °C</p>
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

export default function Home({ searchParams,

}: {
	searchParams: Promise<{ city?: string }>
}) {

	const cities = ["Helsinki", "Oulu", "Jyväskylä", "Rooma", "pihtipudas"]

	return (
		<div className="flex flex-col w-full mx-auto max-w-xl p-8">
			<h1 className="text-xl mx-auto">Weather App</h1>
			<div className="p-3">
				<SearchForm />
				<div className="flex flex-col md:flex-row pt-3 gap-3">
					<ul className="flex flex-col justify-center w-full md:w-60">
						{cities.map((c) => (
							<li className="flex justify-center p-1 transition hover:text-white hover:bg-sky-400" key={c}><Link href={`/?city=${encodeURIComponent(c)}`}>{c}</Link></li>
						))

						}
					</ul>
					<div className="flex justify-center w-full p-3 shadow-sm text-white bg-sky-400">
						<Suspense fallback={<p>Loading weather...</p>}>
							<Weather searchParams={searchParams} />
						</Suspense>
					</div>
				</div>
			</div>
		</div>
	);
}
