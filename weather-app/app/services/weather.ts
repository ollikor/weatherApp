import type { Weather, Forecast } from "../types"

const key = process.env.WEATHER_KEY

export async function getWeather(city: string): Promise<Weather | null> {

    const url = `https://api.openweathermap.org/data/2.5/weather?q=${encodeURIComponent(city)}&units=metric&lang=en&appid=${key}`
    
    const response = await fetch(url)

    if(response.status === 404) return null

    if (!response.ok) throw new Error(`Fetch failed: ${response.status}`) 
    return response.json()
}

export async function getForecast(city: string): Promise<Forecast | null> {
    const url = `https://api.openweathermap.org/data/2.5/forecast?q=${encodeURIComponent(city)}&units=metric&lang=en&appid=${key}`   
    const response = await fetch(url)

    if(response.status === 404) return null

    if(!response.ok) throw new Error(`Fetch failed: ${response.status}`)
    return response.json()
}