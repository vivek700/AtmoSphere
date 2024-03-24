import { FetchData } from "../lib/data";
import { WeatherData } from "../lib/definitions";
import ForecastSideBar from "./forecast/ForecastSideBar";
import Styles from "../weather/home.module.css";
import { Suspense } from "react";
import Forecast from "./forecast/Forecast";
import TimeAndDate from "./TimeAndDate";

const CurrentWeatherInfo = async ({
  latitude,
  longitude,
}: {
  latitude: number;
  longitude: number;
}) => {
  const weatherData: WeatherData = await FetchData(latitude, longitude);

  const directions = ["N", "NE", "E", "SE", "S", "SW", "W", "NW"];
  const index = Math.round((weatherData?.current?.wind_deg % 360) / 45) % 8;
  const windDir = `${weatherData?.current.wind_speed} ${directions[index]}`;

  const visibilityInKm = weatherData?.current?.visibility / 1000;
  const finalVisibility = parseFloat(visibilityInKm.toFixed(1));

  return (
    <>
      <div className="flex flex-col md:flex-row">
        <section className=" flex-1 ">
          <TimeAndDate
            dt={weatherData?.current.dt}
            timezone_offset={weatherData.timezone_offset}
          />
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
              <p className="md:py-1">{weatherData?.current?.pressure} hPa</p>
              <p className="md:py-1">UV: {weatherData?.current.uvi} </p>
              <p className="md:py-1">Visibility: {finalVisibility}km</p>
            </section>
          </section>
        </section>

        <section className=" overflow-hidden flex-1 text-neutral-300">
          <ForecastSideBar
            dailyData={weatherData?.daily}
            timezone_offset={weatherData?.timezone_offset}
          />
        </section>
      </div>

      <p className="text-neutral-300 text-2xl pt-5 ">Hourly forecast</p>

      <section className={`overflow-x-auto w-full ${Styles.scroll_div}`}>
        <Suspense fallback={<p className="text-red-400">forecasting.....</p>}>
          <Forecast
            hourly={weatherData?.hourly}
            timezone_offset={weatherData?.timezone_offset}
          />
        </Suspense>
      </section>
    </>
  );
};

export default CurrentWeatherInfo;