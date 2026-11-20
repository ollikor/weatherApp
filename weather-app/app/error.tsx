"use client"

export default function ErrorPage({
    reset,
}: {
    error: Error
    reset: () => void
}) {
    return(
        <div>
            <h2>Something went wrong.</h2>
            <p>Couldn&apos;t download data. Try again in a few minutes.</p>
            <button onClick={reset}>Try again</button>

            {/* eslint-disable-next-line @next/next/no-html-link-for-pages */}
            <a href="/">Back to home</a>
        </div>
    )
}