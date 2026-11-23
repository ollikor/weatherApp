"use client"

import React, { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import Link from "next/link"
import { Search } from "lucide-react"
import { findCity } from "../actions/city"

export default function SearchPanel({ children }: { children: React.ReactNode }) {

    const [city, setCity] = useState("")
    const [history, setHistory] = useState<string[]>([])
    const [loaded, setLoaded] = useState(false)
    const router = useRouter()

    useEffect(() => {
        const saved = localStorage.getItem("history")
        if (saved) {
            try {
                const parsed = JSON.parse(saved)

                // eslint-disable-next-line react-hooks/set-state-in-effect
                if (Array.isArray(parsed)) setHistory(parsed)

                const hasCity = new URLSearchParams(window.location.search).get("city")
                if (parsed[0] && !hasCity) {
                    router.replace(`/?city=${encodeURIComponent(parsed[0])}`)
                }
            } catch { }
        }
        setLoaded(true)
    }, [])

    useEffect(() => {
        if (!loaded) return
        localStorage.setItem("history", JSON.stringify(history))
    }, [history, loaded])

    async function handleSubmit(e: React.SyntheticEvent<HTMLFormElement>) {
        e.preventDefault()

        const name = city.trim()
        if (name === "") return

        const found = await findCity(name)

        if (found) {
            setHistory([found, ...history.filter((c) => c.toLowerCase() !== found.toLowerCase())].slice(0, 5))
        }

        router.push(`/?city=${encodeURIComponent(found ?? name)}`)
    }

    return (
        <div>

            <form onSubmit={handleSubmit} className="flex w-full gap-2">
                <input
                    value={city}
                    placeholder="Search city"
                    onChange={(e) => setCity(e.target.value)}
                    onClick={(e) => e.currentTarget.select()}
                    className="focus:outline-none border border-zinc-300 rounded-md flex-1 p-2"
                />
                <button
                    aria-label="Search"
                    type="submit"
                    className="rounded-md p-2 transition active:scale-95 hover:bg-sky-300 bg-sky-200 dark:bg-sky-600 dark:hover:bg-sky-600"
                >
                    <Search />
                </button>
            </form>
            <div className="flex md:flex-row flex-col pt-2">
                {history.length > 0 && (
                    <ul className="flex flex-col md:w-3/10 w-full empty:hidden">
                        {history.map((c) => (
                            <li key={c}>
                                <Link className="flex 
                                    justify-center md:justify-start p-1 
                                    transition hover:bg-sky-200 dark:hover:bg-sky-800" href={`/?city=${encodeURIComponent(c)}`}>
                                    {c.split(",")[0]}
                                </Link>
                            </li>
                        ))}
                    </ul>
                )}
                {children}
            </div>
        </div>
    )
}