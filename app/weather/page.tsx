'use client'
import WeatherInfo from '@/app/components/weather/weatherInfo'
import { useEffect, useState } from 'react'
import { FetchData } from '@/app/lib/action'
import { WeatherData } from "@/app/lib/definitions";

const Page = () => {

  const [weatherData, setWeatherData] = useState<WeatherData>()
  const [locError, setLocError] = useState({ state: false, message: "" })



  useEffect(() => {

    try {

      const successCallback = async (position: any) => {
        const latitude = position.coords.latitude
        const longitude = position.coords.longitude
        const data = await FetchData(latitude, longitude)
        setWeatherData(data)
        // console.log(data)


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



  return (
    <>
      {locError.state ? <h1 className='text-red-600'>{locError.message}</h1> :  weatherData && <WeatherInfo {...weatherData}/> 
      }
      
    </>
  )
}

export default Page

