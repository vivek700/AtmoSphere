'use client'

import { BackgroundGradient } from "@/app/components/ui/background-gradient";

import useWeatherData from "@/app/hooks/useWeatherData";
import { Suspense } from "react";

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

    return (
        <>

            {locError.state ? <h1 className='text-red-600'>{locError.message}</h1> : weatherData ?
                <div>
                    <p className=" text-red-400">{formattedTime}</p>
                    <p className="text-base sm:text-2xl  mb-2 text-neutral-200">
                        {weatherData?.name}, {weatherData?.country}
                    </p>
                    <p className="text-5xl text-neutral-400">{temp}&#8451;</p>
                    <p className="text-neutral-400">
                        feels like {feelsLike}&#8451;. {weatherData?.current?.weather[0].main}.
                    </p>
                </div> : <p className="text-yellow-400">loading......</p>

            }
        </>
    );
}

export default WeatherInfo