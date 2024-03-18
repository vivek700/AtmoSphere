'use client'
import { useEffect, useState } from 'react'
import { FetchData } from '@/app/lib/data'
import { WeatherData } from '../lib/definitions'


const useWeatherData = () => {

    const [weatherData, setWeatherData] = useState<WeatherData>()
    const [locError, setLocError] = useState({ state: false, message: "" })


    useEffect(() => {

        try {

            const successCallback = async (position: any) => {
                const latitude: number = position.coords.latitude
                const longitude: number = position.coords.longitude
                // const latitude: number = 27.00092
                // const longitude: number = 81.24365
                const data: WeatherData = await FetchData(latitude, longitude)
                setWeatherData(data)


            }
            const errorCallback = (error: any) => {
                setLocError({
                    state: true,
                    message: error.message
                })

            }
            navigator.geolocation.getCurrentPosition(successCallback, errorCallback)

        } catch (error) {

            console.log(error)
        };
    }, [])


    return { weatherData, locError }


}

export default useWeatherData