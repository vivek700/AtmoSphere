'use server'
import fs from 'fs'
import { cityName } from "./definitions"



const getCityName = async (latitude: number, longitude: number, apiKey: string) => {


    // { cache: 'no-store' } for no cache

    const res = await fetch(`http://api.openweathermap.org/geo/1.0/reverse?lat=${latitude}&lon=${longitude}&limit=1&appid=${apiKey}`)

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



    const res = await fetch(`https://api.openweathermap.org/data/3.0/onecall?lat=${latitude}&lon=${longitude}&appid=${apiKey}&units=metric`)

    if (!res.ok) {
        throw new Error('Failed to fetch')
    }
    const data = await res.json()


    return data

}


export const FetchData = async (latitude: number, longitude: number) => {
    const apiKey: string = process.env.API_KEY || ""


    // const nameData = getCityName(latitude, longitude, apiKey)
    // const weatherData = getWeatherData(latitude, longitude, apiKey)

    // const [weather, name] = await Promise.all([nameData, weatherData])


    const filePath = `${process.cwd()}/app/lib/file.json`

    // fs.writeFile(filePath, JSON.stringify({ ...weather, ...name }), (err) => {
    //     if (err) {
    //         console.error(err)
    //     } else {
    //         console.log('JSON data saved successfully!')
    //     }
    // })


    function convertUnixTo12hFormat(unixTimestamp: number) {
        if (typeof unixTimestamp !== 'number' || isNaN(unixTimestamp)) {
            console.error('Invalid input: Please provide a valid Unix timestamp.');
            return null;
        }

        const date = new Date(unixTimestamp * 1000); // Convert timestamp to Date object
        const hours = date.getHours() % 12 || 12;  // Adjust for 12-hour format
        const minutes = date.getMinutes().toString().padStart(2, '0');
        const amPm = date.getHours() < 12 ? 'am' : 'pm';
        return `${hours}${amPm}`;
    }


    function windSpeed(speed: number) {
        return `${parseFloat(speed.toFixed(1))}m/s`

    }



    try {
        const fileData = fs.readFileSync(filePath);
        const parsedData = JSON.parse(fileData.toString() || "{}");
        // console.log(parsedData);

        const modData = parsedData.hourly.map((data: any) => ({ ...data, pop: `${data.pop}%`, weather: data.weather[0].description, id: data.weather[0].id, dt: convertUnixTo12hFormat(data.dt), wind_speed: windSpeed(data.wind_speed) }))
        // console.log(modData)


        return { ...parsedData, hourly: modData }
    } catch (err) {
        console.error('Error reading file from disk:', err);
    }



    // console.log({ ...weather, ...name })
    // return { ...weather, ...name }
}





