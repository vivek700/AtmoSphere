import { FetchData } from "../lib/data";
import { WeatherData } from "../lib/definitions";
import ForecastSideBar from "./forecast/ForecastSideBar";
import Styles from "../weather/home.module.css";
import Forecast from "./forecast/Forecast";
import TimeAndDate from "./TimeAndDate";
import { Icon } from "../lib/Icon";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faRocket, faLocationArrow } from "@fortawesome/free-solid-svg-icons";
import WindDir from "./WindDir";
import Search from "./Search";

const CurrentWeatherInfo = async ({
  latitude,
  longitude,
}: {
  latitude: number;
  longitude: number;
}) => {
  const weatherData: WeatherData = await FetchData(latitude, longitude);

  const icon = weatherData?.current?.icon;

  const visibilityInKm = weatherData?.current?.visibility / 1000;
  const finalVisibility = parseFloat(visibilityInKm.toFixed(1));

  return (
    <>
      <div className="flex flex-col md:flex-row">
        <section className=" flex-1">
          <Search />
          <TimeAndDate
            dt={weatherData?.current.dt}
            timezone_offset={weatherData.timezone_offset}
          />
          <p className="text-2xl sm:text-lime-300xl py-1  md:mb-5 text-neutral-200">
            {weatherData?.cityName}, {weatherData?.country}
          </p>
          <div className="flex gap-x-2">
            <FontAwesomeIcon
              icon={Icon(icon)}
              className="w-9 h-12 text-neutral-400"
            />
            <p className="text-5xl text-neutral-400">
              {weatherData?.current.temp}&#8451;
            </p>
          </div>
          <p className="text-neutral-200 py-3">
            feels like {weatherData?.current.feels_like}&#8451;.{" "}
            {weatherData?.current?.main}.
          </p>
          <section className="text-neutral-400 pl-5 flex gap-x-6 border-l border-red-400">
            <section>
              <p>
                <WindDir
                  deg={weatherData?.current.wind_deg}
                  wind_speed={weatherData?.current.wind_speed}
                />
              </p>
              <p className="md:my-1">
                Humidity: {weatherData?.current?.humidity}%
              </p>
              <p>Dew Point: {weatherData?.current.dew_point}&#8451;</p>
            </section>
            <section>
              <p>
                <span>
                  <FontAwesomeIcon
                    icon={faRocket}
                    size="sm"
                    className=" pr-1 inline-block w-3"
                  />
                </span>
                {weatherData?.current?.pressure} hPa
              </p>
              <p className="md:my-1">UV: {weatherData?.current.uvi} </p>
              <p>Visibility: {finalVisibility}km</p>
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
        <Forecast
          hourly={weatherData?.hourly}
          timezone_offset={weatherData?.timezone_offset}
        />
      </section>
    </>
  );
};

export default CurrentWeatherInfo;
