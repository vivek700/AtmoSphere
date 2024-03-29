"use client";

import { useState, useRef, useEffect } from "react";
import styles from "@/app/weather/home.module.css";
import { DailyWeatherData } from "@/app/lib/definitions";
import useTimeDate from "@/app/hooks/useTimeDate";
import { Icon } from "../../lib/Icon";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCloudRain, faRocket } from "@fortawesome/free-solid-svg-icons";
import WindDir from "../WindDir";

const ForecastSideBar = ({
  dailyData,
  timezone_offset,
}: {
  dailyData: DailyWeatherData[];
  timezone_offset: number;
}) => {
  const [convertUnixTo12hFormat] = useTimeDate();

  const daily = dailyData?.map((data: DailyWeatherData) => ({
    ...data,
    time: convertUnixTo12hFormat(data.dt, timezone_offset).date,
    sunrise: convertUnixTo12hFormat(data.sunriseT, timezone_offset).time,
    sunset: convertUnixTo12hFormat(data.sunsetT, timezone_offset).time,
  }));

  // console.log(daily);

  const navRef = useRef<HTMLMenuElement | null>(null);
  const [pressed, setPressed] = useState(false);
  const [checkId, setCheckId] = useState("");

  function handleClick(id: string) {
    if (checkId === id) {
      if (pressed) setPressed(false);
      else setPressed(true);
    } else {
      setPressed(true);
    }
    setCheckId(id);
  }

  useEffect(() => {
    const container = navRef.current?.querySelector("[data-active=true]");

    if (container) {
      container.scrollIntoView({
        behavior: "instant",
        inline: "start",
        block: "nearest",
      });
    }
  }, [checkId]);

  const infoElement = daily?.map((info: DailyWeatherData) => (
    <menu
      onClick={(e) => handleClick(info.id)}
      key={info?.id}
      className="flex rounded h-11 border-radius cursor-pointer hover:bg-neutral-800 text-sm md:text-base "
    >
      <li className="py-2 flex-1 pl-2">{info?.time}</li>
      <li className="py-2 flex-1 flex gap-x-1">
        <FontAwesomeIcon
          icon={Icon(info?.icon)}
          className="w-8 h-6 text-neutral-400"
        />
        {`${info?.temp.max} / ${info?.temp.min}`}&#8451;
      </li>
      <li className=" py-1 pr-2 max-w-20 text-center text-xs">
        {info?.description}
      </li>
    </menu>
  ));

  const topbarElement = daily?.map((info: DailyWeatherData) => (
    <li
      data-active={`${checkId === info?.id ? true : false}`}
      key={info?.id}
      onClick={(e) => handleClick(info?.id)}
      className={`${
        checkId === info?.id ? "text-red-500" : ""
      } flex-1 mx-2 cursor-pointer`}
    >
      {info?.time}
    </li>
  ));

  function capitalizeFirstLetter(str: string) {
    return str.charAt(0).toUpperCase() + str.slice(1);
  }

  const forecasteDetailElement = daily?.map((info: DailyWeatherData) => {
    if (info?.id === checkId) {
      return (
        <section key={info?.id} className="text-sm md:text-base">
          <section className="py-6 flex gap-x-3">
            <FontAwesomeIcon
              icon={Icon(info?.icon)}
              className="w-11 h-12 text-neutral-400"
            />
            <div>
              <p className="text-lg text-neutral-300">
                {capitalizeFirstLetter(info?.description)}.
              </p>
              <p className="text-neutral-500">
                The high will be {info?.temp.max}&#8451;, the low will be{" "}
                {info?.temp.min}&#8451;.
              </p>
            </div>
          </section>
          <section className="border-l border-red-400">
            <p>
              <FontAwesomeIcon className="pl-5 pr-1" icon={faCloudRain} />
              <span>{info?.pop}%</span>
              <span className="pl-8">
                <WindDir deg={info?.wind_deg} wind_speed={info?.wind_speed} />
              </span>
              <FontAwesomeIcon
                className="pl-8 pr-1"
                icon={faRocket}
                size="xs"
              />
              <span>{info?.pressure}hPa</span>
            </p>
            <p className="whitespace-nowrap">
              <span className="pl-5">Humidity: {info?.humidity}%</span>
              <span className="pl-5">UV: {info?.uvi}</span>
              <span className="pl-6 ">
                Dew point: {info?.dew_point}&#8451;{" "}
              </span>
            </p>
          </section>

          <section className={`pt-6 overflow-x-auto  ${styles.scroll_div}`}>
            <section className="pl-20  pr-3 flex justify-around">
              <p>Morning</p>
              <p>Afternoon</p>
              <p>Evening</p>
              <p>Night</p>
            </section>
            <aside className="flex ">
              <section className=" pt-2 flex-initial">
                <p className="text-xs">TEMPERATURE</p>
                <p className="text-xs pt-2">FEELS LIKE</p>
              </section>
              <section className=" pt-1 flex-1">
                <aside className="pb-1 md:p-0 flex justify-around">
                  <p>{info?.temp.morn}&#8451;</p>
                  <p>{info?.temp.day}&#8451;</p>
                  <p>{info?.temp.eve}&#8451;</p>
                  <p>{info?.temp.night}&#8451;</p>
                </aside>
                <aside className="flex justify-around">
                  <p>{info?.feels_like.morn}&#8451;</p>
                  <p>{info?.feels_like.day}&#8451;</p>
                  <p>{info?.feels_like.eve}&#8451;</p>
                  <p>{info?.feels_like.night}&#8451;</p>
                </aside>
              </section>
              {/* <p className="bg-cyan-600"></p>
              <p className="whitespace-nowrap"></p> */}
            </aside>
          </section>
          <section className="pt-6">
            <span className="px-3 text-xs">SUNRISE</span>
            <span className="px-6 text-xs">SUNSET</span>
            <p>
              <span className="px-2 text-lg">{info?.sunrise}</span>
              <span className="px-5 text-lg">{info?.sunset}</span>
            </p>
          </section>
        </section>
      );
    }
  });

  return (
    <>
      <p className="pb-4 pt-5 md:pt-0 text-2xl overflow-x-auto">
        8-day forecast
      </p>
      {pressed ? (
        <div>
          <menu
            ref={navRef}
            className={` bg-neutral-800 rounded   py-2 h-11 flex overflow-x-auto whitespace-nowrap mx-auto ${styles.scroll_div}`}
          >
            {topbarElement}
          </menu>
          {forecasteDetailElement}
        </div>
      ) : (
        <>{infoElement}</>
      )}
    </>
  );
};

export default ForecastSideBar;
