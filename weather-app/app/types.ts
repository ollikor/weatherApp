export type Weather = {
    name: string
    sys: { country: string }
    main: {
        temp: number
        temp_max: number
        temp_min: number
        feels_like: number
    }
    weather: {
        description: string
        icon: string
    }[]
    wind: {
        speed: number
    }
}

export type Forecast = {
    city: { name: string, country: string, timezone: number }
    list: {
        dt: number
        main: { temp: number, feels_like: number }
        weather: { description: string; icon: string }[]
    }[]
}