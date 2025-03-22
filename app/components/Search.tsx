"use client";

import { faLocationDot, faMagnifyingGlass } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { fetchCoords } from "../lib/data";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { city } from "../lib/definitions";

const Search = () => {
  const router = useRouter();

  async function handleGetLocation() {
    try {
      const success = (position: GeolocationPosition) => {
        const { latitude, longitude } = position.coords;
        handlePath(longitude, latitude)
      };
      navigator.geolocation.getCurrentPosition(success);

    } catch (error) {
      console.log(error);
    }
  }

  const [listVisibility, setListVisibility] = useState(false);

  const [searchCityName, setSearchCityName] = useState<string>("");
  const [cities, setCities] = useState([]);

  const handleChange = (term: string) => {
    setSearchCityName(term);
    if (term) return;
    setListVisibility(false);
  };

  function handleFocus() {
    if (cities.length === 0) return;
    setListVisibility(true);
  }
  function handleBlur() {
    setTimeout(() => {
      setListVisibility(false);
    }, 100);
  }

  const handleSearch = async () => {
    const res = await fetchCoords(searchCityName);
    if (res.length > 0) {
      setCities(res);
      setListVisibility(true);
    } else {
      setListVisibility(false);
    }
  };

  useEffect(() => {
    const timer = setTimeout(async () => {
      if (!searchCityName) return;
      handleSearch();
    }, 700);

    return () => {
      clearTimeout(timer);
    };
  }, [searchCityName]);

  const handlePath = (lon: number, lat: number) => {
    const query = `long=${lon}&lati=${lat}`;
    router.push(`/weather?${query}`);
  };

  const cityElement = cities?.map((city: city) => {
    return (
      <li
        key={city.lat}
        onClick={() => handlePath(city?.lon, city?.lat)}
        className="py-1 px-2 mb-2 mt-1 rounded bg-[#212125] cursor-pointer"
      >
        {city.name}, {city.state}, {city.country}
      </li>
    );
  });

  useEffect(() => {
    if (listVisibility) {
      document.body.style.overflow = "hidden";
    }
    return () => {
      document.body.style.overflow = "auto";
    };
  }, [listVisibility]);

  return (
    <>
      <section className="relative max-w-72 ">
        <input
          onFocus={handleFocus}
          onBlur={handleBlur}
          type="text"
          className="py-1 mb-3 w-full  px-9 rounded-md border bg-[#18181B] border-gray-400 text-gray-200"
          placeholder="Search cities..."
          onChange={(e) => handleChange(e.target.value)}
          defaultValue={searchCityName}
        />
        <FontAwesomeIcon
          icon={faMagnifyingGlass}
          className="w-5 h-5 text-gray-400 absolute left-2 top-2"
        />
        <FontAwesomeIcon
          onMouseDown={handleGetLocation}
          icon={faLocationDot}
          className=" h-5 text-gray-400 absolute right-2 top-2 cursor-pointer hover:text-violet-300 focus:text-violet-300"
        />


        {listVisibility && (
          <section className=" bg-[#18181B] text-gray-300 absolute w-full max-w-72 border border-gray-400 rounded-md px-4 py-2">
            <ul>{cityElement}</ul>
          </section>
        )}
      </section>
    </>
  );
};

export default Search;
