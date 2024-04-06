"use client";

import { faArrowRight, faSpinner } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

export default function Home() {
  const [loading, setLoading] = useState<boolean>(false);
  const [isLoc, setIsLoc] = useState({
    long: 0,
    lati: 0,
    error: false,
    error_message: "",
  });

  const router = useRouter();

  function handleGetLocation() {
    try {
      const success = (position: GeolocationPosition) => {
        const { latitude, longitude } = position.coords;
        setIsLoc((prev) => ({ ...prev, long: longitude, lati: latitude }));
        setLoading(false);
      };
      const handleError = ({ message }: GeolocationPositionError) => {
        setIsLoc((prev) => ({ ...prev, error_message: message, error: true }));
        setLoading(false);
      };
      navigator.geolocation.getCurrentPosition(success, handleError);
    } catch (error) {
      // console.log(error);
    }
  }

  useEffect(() => {
    handleGetLocation();
  }, []);

  function handleLocation() {
    setIsLoc((prev) => ({ ...prev, error: false }));
    setLoading(true);
    try {
      const { long, lati } = isLoc;
      if (!long && !lati) {
        handleGetLocation();
      } else {
        const query = `long=${long}&lati=${lati}`;
        router.push(`/weather?${query}`);
      }
    } catch (error) {}
  }

  return (
    <>
      <div className="h-screen w-full bg-black   bg-dot-white/[0.2]  relative flex flex-col items-center justify-center">
        {/* Radial gradient for the container to give a faded look */}
        <div className="absolute pointer-events-none inset-0 flex  items-center justify-center bg-black  [mask-image:radial-gradient(ellipse_at_center,transparent_20%,black)]"></div>
        <button
          type="button"
          disabled={loading}
          onClick={handleLocation}
          className="mb-4 flex justify-center items-center space-x-2 text-white font-semibold hover:scale-110 transition-all duration-300 ease-in-out bg-cyan-500 px-5 py-3 rounded-full hover:text-cyan-500 hover:bg-black shadow-lg shadow-cyan-500/50 focus:outline-none focus:ring focus:ring-cyan-300"
        >
          Get Started
          {loading ? (
            <FontAwesomeIcon
              icon={faSpinner}
              className="animate-spin w-4 h-4 ml-1"
            />
          ) : (
            <FontAwesomeIcon icon={faArrowRight} className="ml-1 w-4 h-4" />
          )}
        </button>
        <>
          {isLoc.error ? (
            <p className="text-red-600">
              Location Unavailable: {isLoc?.error_message}
            </p>
          ) : null}
        </>
        <p className="text-4xl sm:text-7xl font-bold relative z-20 bg-clip-text text-transparent bg-gradient-to-b from-neutral-200 to-neutral-500 py-8 ">
          AtmoSphere
        </p>
      </div>
    </>
  );
}
