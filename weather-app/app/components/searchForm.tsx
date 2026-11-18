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
            <form onSubmit={handleSubmit}>
                <input 
                    value={city}
                    placeholder="Search city" 
                    onChange={(e) => setCity(e.target.value)}
                    onClick={(e) => e.currentTarget.select()}
                />
                <button type="submit">Search</button>
            </form>
    )
}