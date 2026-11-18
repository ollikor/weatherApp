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
            <p>Couldn't download data. Try again in a few minute.</p>
            <button onClick={reset}>Try again</button>
            <a href="/">Back to home</a>
        </div>
    )
}