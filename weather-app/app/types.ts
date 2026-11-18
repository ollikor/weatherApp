export type Weather = {
    name: string
    main: {
        temp: number
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