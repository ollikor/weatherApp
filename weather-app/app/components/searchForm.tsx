"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Search } from "lucide-react"

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
                    className="focus:outline-none border border-zinc-300 rounded-md flex-1 p-2"
                />
                <button 
                    type="submit"
                    className="text-white rounded-md p-2 transition active:scale-95 hover:bg-sky-500 bg-sky-400"
                >
                    <Search />
                </button>
            </form>
    )
}