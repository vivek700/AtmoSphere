'use server'

import { cityName } from "./definitions"



const getCityName = async (latitude: number, longitude: number, apiKey: string) => {


    const res = await fetch(`http://api.openweathermap.org/geo/1.0/reverse?lat=${latitude}&lon=${longitude}&limit=1&appid=${apiKey}`, { cache: 'no-store' })

    if (!res.ok) {
        throw new Error('Failed to fetch City name')
    }
    const LocName = await res.json()

    const name: cityName = {
        name: LocName[0].name,
        state: LocName[0].state,
        country: LocName[0].country
    }


    return name


}

const getWeatherData = async (latitude: number, longitude: number, apiKey: string) => {



    const res = await fetch(`https://api.openweathermap.org/data/3.0/onecall?lat=${latitude}&lon=${longitude}&appid=${apiKey}&units=metric`, { cache: 'no-store' })

    if (!res.ok) {
        throw new Error('Failed to fetch')
    }
    const data = await res.json()


    return data

}


export const FetchData = async (latitude: number, longitude: number) => {
    const apiKey: string = process.env.API_KEY || ""


    const nameData = getCityName(latitude, longitude, apiKey)
    const weatherData = getWeatherData(latitude, longitude, apiKey)

    const [weather, name] = await Promise.all([nameData, weatherData])


    // console.log(data)
    return { ...weather, ...name }
}





