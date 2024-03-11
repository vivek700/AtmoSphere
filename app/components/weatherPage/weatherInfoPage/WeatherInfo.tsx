'use client'

import { BackgroundGradient } from "@/app/components/ui/background-gradient";

import useWeatherData from "@/app/hooks/useWeatherData";
import Forecast from "./Forecast";

import Styles from '@/app/weather/home.module.css'

const WeatherInfo = () => {


    const [weatherData, locError] = useWeatherData()


    const temp = weatherData?.current ? Math.round(weatherData.current?.temp) : 0;
    const feelsLike = weatherData?.current ? Math.round(weatherData.current?.feels_like) : 0;

    const currentDate = new Date();
    const formattedTime = currentDate.toLocaleTimeString("en-US", {
        weekday: "short",
        month: "short",
        hour: "numeric",
        minute: "numeric",
        hour12: true,
    });
    // console.log(weatherData);



    const directions = ['N', 'NE', 'E', 'SE', 'S', 'SW', 'W', 'NW'];
    const index = Math.round(((weatherData?.current?.wind_deg % 360) / 45)) % 8;
    const windDir = `${parseFloat(weatherData?.current?.wind_speed.toFixed(1))}m/s ${directions[index]}`


    const dewPoint = parseFloat(weatherData?.current?.dew_point.toFixed())

    const uv = parseFloat(weatherData?.current?.uvi).toFixed()

    const visibilityInKm = (weatherData?.current?.visibility / 1000)

    const finalVisibility = parseFloat(visibilityInKm.toFixed(1))







    return (
        <>

            {locError.state ? <h1 className='text-red-600'>{locError.message}</h1> :
                <div>
                    <p className=" text-red-400">{formattedTime}</p>
                    <p className="text-base sm:text-lime-300xl  mb-2 text-neutral-200">
                        {weatherData?.name}, {weatherData?.country}
                    </p>
                    <p className="text-5xl text-neutral-400">{temp}&#8451;</p>
                    <p className="text-neutral-400 py-3">
                        feels like {feelsLike}&#8451;. {weatherData?.current?.weather[0].main}.
                    </p>
                    <section className="text-neutral-400 px-5 flex gap-x-6 border-l border-red-400">
                        <section>
                            <p >{windDir}</p>
                            <p>Humidity: {weatherData?.current?.humidity}%</p>
                            <p>Dew Point: {dewPoint}&#8451;</p>
                        </section>
                        <section >
                            <p>{weatherData?.current?.pressure} hPa</p>
                            <p>UV: {uv} </p>
                            <p>Visibility: {finalVisibility}km</p>
                        </section>
                    </section >
                    <p className='text-neutral-300 text-2xl pt-14' >Hourly forecast</p>
                    <section className={`overflow-x-auto w-full ${Styles.scroll_div}`}>
                        <Forecast data={weatherData?.hourly} />
                    </section>
                </div>

            }
        </>
    );
}

export default WeatherInfo