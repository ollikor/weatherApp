import type { Weather } from "../types"

export async function getWeather(city: string): Promise<Weather | null> {

    const key = process.env.WEATHER_KEY

    const url = `https://api.openweathermap.org/data/2.5/weather?q=${encodeURIComponent(city)}&units=metric&lang=en&appid=${key}`
    
    const response = await fetch(url)

    if(response.status === 404) {
        return null
    }

    if (!response.ok) {
        throw new Error(`Fetch failed: ${response.status}`)
    }
    return response.json()
}