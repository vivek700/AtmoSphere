"use client";

import useWeatherData from "@/app/hooks/useWeatherData";
import Styles from "@/app/weather/home.module.css";
import ForecastSideBar from "@/app/components/forecast/ForecastSideBar";
import {
  DailyWeatherData,
  HourlyWeatherData,
  WeatherData,
} from "@/app/lib/definitions";
import useTimeDate from "@/app/hooks/useTimeDate";
import { Suspense, lazy } from "react";
import Forecast from "../components/forecast/Forecast";

// const Forecast = lazy(() =>
//   delayForDemo(import("../components/forecast/Forecast"))
// );

// import Forecast from "@/app/components/forecast/Forecast";

// function delayForDemo(promise) {
//   return new Promise((resolve) => {
//     setTimeout(resolve, 2000);
//   }).then(() => promise);
// }

const Page = () => {
  const weatherData = useWeatherData().weatherData as WeatherData;

  const { locError } = useWeatherData();

  const [convertUnixTo12hFormat] = useTimeDate();

  // console.log(weatherData);

  const time = convertUnixTo12hFormat(
    weatherData?.current.dt,
    weatherData?.timezone_offset
  ).timeWithDate;

  const directions = ["N", "NE", "E", "SE", "S", "SW", "W", "NW"];
  const index = Math.round((weatherData?.current?.wind_deg % 360) / 45) % 8;
  const windDir = `${weatherData?.current.wind_speed} ${directions[index]}`;

  const visibilityInKm = weatherData?.current?.visibility / 1000;
  const finalVisibility = parseFloat(visibilityInKm.toFixed(1));

  const hourlyData = weatherData?.hourly.map((data: HourlyWeatherData) => ({
    ...data,
    time: convertUnixTo12hFormat(data.dt, weatherData.timezone_offset).hours,
  }));

  const dailyData = weatherData?.daily.map((data: DailyWeatherData) => ({
    ...data,
    time: convertUnixTo12hFormat(data.dt, weatherData.timezone_offset).date,
    sunrise: convertUnixTo12hFormat(data.sunriseT, weatherData.timezone_offset)
      .time,
    sunset: convertUnixTo12hFormat(data.sunsetT, weatherData.timezone_offset)
      .time,
  }));

  return (
    <>
      {locError.state ? (
        <h1 className="text-red-600">{locError.message}</h1>
      ) : (
        <>
          <div className="flex flex-col md:flex-row">
            <section className=" flex-1 ">
              <p className=" text-red-400">{time}</p>
              <p className="md:text-2xl sm:text-lime-300xl py-1  md:mb-6 text-neutral-200">
                {weatherData?.cityName}, {weatherData?.country}
              </p>
              <p className="text-5xl text-neutral-400">
                {weatherData?.current.temp}&#8451;
              </p>
              <p className="text-neutral-200 py-3">
                feels like {weatherData?.current.feels_like}&#8451;.{" "}
                {weatherData?.current?.main}.
              </p>
              <section className="text-neutral-400 px-5 flex gap-x-6 border-l border-red-400">
                <section>
                  <p className="md:py-1">{windDir}</p>
                  <p className="md:py-1">
                    Humidity: {weatherData?.current?.humidity}%
                  </p>
                  <p className="md:py-1">
                    Dew Point: {weatherData?.current.dew_point}&#8451;
                  </p>
                </section>
                <section>
                  <p className="md:py-1">
                    {weatherData?.current?.pressure} hPa
                  </p>
                  <p className="md:py-1">UV: {weatherData?.current.uvi} </p>
                  <p className="md:py-1">Visibility: {finalVisibility}km</p>
                </section>
              </section>
            </section>

            <section className=" overflow-hidden flex-1 text-neutral-300">
              <ForecastSideBar daily={dailyData} />
            </section>
          </div>

          <p className="text-neutral-300 text-2xl pt-5 ">Hourly forecast</p>

          <section className={`overflow-x-auto w-full ${Styles.scroll_div}`}>
            <Suspense
              fallback={<p className="text-red-400">forecasting.....</p>}
            >
              <Forecast hourly={hourlyData} />
            </Suspense>
          </section>
        </>
      )}
    </>
  );
};

export default Page;
