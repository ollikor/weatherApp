"use server"

import { getWeather } from "../services/weather"

export async function findCity(name: string): Promise<string | null> {
    const trimmed = name.trim()
    if(trimmed === "" || trimmed.length > 100) return null
    const data = await getWeather(trimmed)
    return data ? `${data.name},${data.sys.country}` : null
}