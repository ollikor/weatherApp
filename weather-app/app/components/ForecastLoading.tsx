export default function ForecastLoading() {
    return (
        <div role="status" className="flex flex-col w-full max-w-2xl mx-auto p-8 animate-pulse">
            <span className="sr-only">Loading forecast</span>
            <div className="h-5 w-64 rounded bg-sky-300 m-2 dark:bg-sky-600" />
            <div className="flex gap-2 mt-2">
                {Array.from({ length: 5 }).map((_, i) => (
                    <div key={i} className="h-8 w-8 rounded-full bg-sky-300 dark:bg-sky-600" />
                ))}
            </div>
            <div className="mt-4 flex flex-col gap-2">
                {Array.from({ length: 6 }).map((_, i) => (
                    <div key={i} className="h-14 rounded bg-sky-200 dark:bg-sky-600" />
                ))}
            </div>
        </div>
    )
}