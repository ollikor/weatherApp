import { Suspense } from "react";
import Link from "next/link"
import Image from "next/image"
import SearchForm from "./components/searchForm";
import { getWeather } from "./services/weather"

async function Weather({ searchParams }: { searchParams: Promise<{ city?: string }> }) {
  const { city } = await searchParams
  if(!city) return null
  const data = await getWeather(city)
  console.log(data)

  if (data === null) {
    return <p>City is not found.</p>
  }

  return (
    <div>
      <Link href={`/weather/${data.name}`}>{data.name}</Link>
      <p>Temperature: {data.main.temp}</p>
      <Image
        src={`https://openweathermap.org/img/wn/${data.weather[0].icon}@2x.png`}
        alt={data.weather[0].description}
        width={60}
        height={60}
      />
    </div>
  )
}

export default function Home({ searchParams,

}: {
  searchParams: Promise<{ city?: string }>
}) {
  return (
    <div className="flex flex-col flex-1 items-center justify-center bg-zinc-50 font-sans dark:bg-black">
      <p>weather app</p>
      <ul>
        <SearchForm />
        <li><Link href="/?city=helsinki">Helsinki</Link></li>
        <li><Link href="/?city=oulu">Oulu</Link></li>
        <li><Link href="/?city=jyvaskyla">Jyväskylä</Link></li>
        <Suspense fallback={<p>Loading weather...</p>}>
          <Weather searchParams={searchParams} />
        </Suspense>
      </ul>
    </div>
  );
}
