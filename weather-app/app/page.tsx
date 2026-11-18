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
    <div className="flex flex-col items-center w-full ml-auto w-64 rounded-xl bg-sky-100 p-6 shadow-md dark:bg-zinc-900">
      <Link href={`/weather/${encodeURIComponent(data.name)}`}>{data.name}</Link>
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

  const cities = ["Helsinki", "Oulu", "Jyväskylä"]

  return (
    <div className="flex flex-col flex-1 items-center gap-8 bg-zinc-50 p-8 font-sans dark:bg-black">
      <h1 className="text-3xl">Weather App</h1>
      <div className="flex w-full max-w-xl flex-col gap-6">
        <SearchForm />
        <div className="flex flex-col gap-6 md:flex-row md:items-stretch md:gap-8">
          <ul className="flex w-32 shrink-0 flex-col justify-center gap-2 rounded-xl bg-white p-6 shadow-md dark:bg-zinc-900">
            {cities.map((c) => (
              <li key={c}><Link href={`/?city=${encodeURIComponent(c)}`}>{c}</Link></li>
            ))

            }
          </ul>
          <div className="min-w-0 w-full flex-1 md:w-auto">
            <Suspense fallback={<p>Loading weather...</p>}>
              <Weather searchParams={searchParams} />
            </Suspense>
          </div>
        </div>
      </div>
    </div>
  );
}
