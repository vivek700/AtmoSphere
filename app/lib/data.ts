'use server'

import fs from 'fs';
import { CurrentWeatherData, DailyWeatherData, HourlyWeatherData, LocationData, TimeData, WeatherData } from "./definitions"

import { v4 as uuidv4 } from 'uuid'





const getCityName = async (latitude: number, longitude: number, apiKey: string) => {


    // { cache: 'no-store' } for no cache

    const res = await fetch(`http://api.openweathermap.org/geo/1.0/reverse?lat=${latitude}&lon=${longitude}&limit=1&appid=${apiKey}`, { cache: 'no-store' })

    if (!res.ok) {
        throw new Error('Failed to fetch City name')
    }
    const LocName = await res.json()

    const location: LocationData = {
        name: LocName[0].name,
        state: LocName[0].state,
        country: LocName[0].country
    }


    return location


}

const getWeatherData = async (latitude: number, longitude: number, apiKey: string) => {



    const res = await fetch(`https://api.openweathermap.org/data/3.0/onecall?lat=${latitude}&lon=${longitude}&appid=${apiKey}&units=metric`, { cache: 'no-store' })

    if (!res.ok) {
        throw new Error('Failed to fetch')
    }
    const data = await res.json()


    return data

}
// const latitude: number = 27.00092
// const longitude: number = 81.24365

export const FetchData = async (latitude: number = 27.00092, longitude: number = 81.24365) => {
    const apiKey: string = process.env.API_KEY || ""


    const locData = getCityName(latitude, longitude, apiKey)
    const weatherData = getWeatherData(latitude, longitude, apiKey)

    const [weather, locInfo] = await Promise.all([weatherData, locData])






    function windSpeed(speed: number): string {
        return `${parseFloat(speed.toFixed(1))}m/s`

    }

    function roundOff(temp: number) {
        return parseFloat(temp?.toFixed())
    }


    function rainPercentage(n: number) {
        const percentage = n * 100
        return Number(percentage.toFixed())
    }








    // const filePath = `${process.cwd()}/app/lib/file.json`


    // try {
    //     const fileData = fs.readFileSync(filePath);
    //     const parsedData = JSON.parse(fileData.toString() || "{}");
    //     // console.log(parsedData);



    const currentData: CurrentWeatherData = {
        id: uuidv4(),
        dt: weather.current.dt,
        icon: weather.current.weather[0].icon,
        main: weather.current.weather[0].main,
        temp: roundOff(weather.current.temp),
        pressure: weather.current.pressure,
        humidity: weather.current.humidity,
        dew_point: roundOff(weather.current.dew_point),
        uvi: roundOff(weather.current.uvi),
        visibility: weather.current.visibility,
        wind_speed: windSpeed(weather.current.wind_speed),
        wind_deg: weather.current.wind_deg,
        feels_like: roundOff(weather.current.feels_like),
        clouds: weather.current.clouds,
        time: ""

    }

    const daily: DailyWeatherData[] = weather.daily.map((data: any, i: number) => ({
        id: uuidv4(),
        icon: data.weather[0].icon,
        description: data.weather[0].description,
        clouds: data.clouds,
        dew_point: roundOff(data.dew_point),
        dt: data.dt,
        humidity: data.humidity,
        pop: rainPercentage(data.pop),
        uvi: roundOff(data.uvi),
        visibility: data.visibility,
        pressure: data.pressure,
        wind_deg: data.wind_deg,
        feels_like: {
            day: roundOff(data.feels_like.day),
            eve: roundOff(data.feels_like.eve),
            morn: roundOff(data.feels_like.morn),
            night: roundOff(data.feels_like.night)
        },
        temp: {
            day: roundOff(data.temp.day),
            eve: roundOff(data.temp.eve),
            max: roundOff(data.temp.max),
            min: roundOff(data.temp.min),
            morn: roundOff(data.temp.morn),
            night: roundOff(data.temp.night)
        },
        wind_speed: windSpeed(data?.wind_speed),
        sunriseT: data.sunrise,
        sunsetT: data.sunset,
        sunrise: "",
        sunset: "",
        time: ""

    }))

    const hourly: HourlyWeatherData[] = weather.hourly.map((data: any) => ({
        id: uuidv4(),
        clouds: data.clouds,
        dt: data.dt,
        temp: roundOff(data.temp),
        wind_speed: windSpeed(data.wind_speed),
        pop: `${rainPercentage(data.pop)}%`,
        description: data.weather[0].description,
        time: ""
    }))




    const weatherInfo: WeatherData = {
        id: uuidv4(),
        timezone_offset: weather.timezone_offset,
        cityName: locInfo.name,
        state: locInfo.state,
        country: locInfo.country,
        current: currentData,
        hourly: hourly,
        daily: daily

    }


    // console.log(weather)


    // fs.writeFile(filePath, JSON.stringify({ ...weatherInfo }), (err) => {
    //     if (err) {
    //         console.error(err)
    //     } else {
    //         console.log('JSON data saved successfully!')
    //     }
    // })


    return weatherInfo
}





