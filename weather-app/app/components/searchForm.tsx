"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"

export default function SearchForm() {

    const [city, setCity] = useState("") 
    const router = useRouter()

    function handleSubmit(e: React.SyntheticEvent<HTMLFormElement>) {
        e.preventDefault()
        if(city.trim() === "") return
        router.push(`/?city=${encodeURIComponent(city.trim())}`)
    }

    return(
            <form onSubmit={handleSubmit} className="flex w-full gap-2">
                <input 
                    value={city}
                    placeholder="Search city" 
                    onChange={(e) => setCity(e.target.value)}
                    onClick={(e) => e.currentTarget.select()}
                    className="flex-1 rounded-lg border border-zinc-400 bg-white px-4 py-2 text-black focus:border-sky-500 focus:outline-none"
                />
                <button 
                    type="submit"
                    className="rounded-lg bg-sky-600 px-5 py-2 font-semibold text-white hover:bg-sky-700"
                >
                    Search
                </button>
            </form>
    )
}