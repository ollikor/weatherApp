import { Suspense } from "react";
import SearchPanel from "./components/SearchPanel";
import Weather from "./components/Weather"


export default function Home({ searchParams,

}: {
	searchParams: Promise<{ city?: string }>
}) {

	return (
		<main className="flex flex-col w-full mx-auto max-w-xl pt-8 pb-8">
			<h1 className="text-xl mx-auto">Weather App</h1>
			<div className="p-3">
				<SearchPanel>
					<div className="flex justify-center w-full p-3 shadow-sm bg-sky-200 empty:hidden">
						<Suspense fallback={<p>Loading weather...</p>}>
							<Weather searchParams={searchParams} />
						</Suspense>
					</div>
				</SearchPanel>
			</div>
		</main>
	);
}
