"use client";

import LocationIcon from "@/app/icon/LocationIcon";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

export default function Home() {
  const [locError, setLocError] = useState({
    state: false,
    message: "",
  });
  const [location, setLocation] = useState({ long: 0, lati: 0 });

  const router = useRouter();

  useEffect(() => {
    try {
      const successCallback = async (position: any) => {
        const latitude: number = position.coords.latitude;
        const longitude: number = position.coords.longitude;
        setLocation({ long: longitude, lati: latitude });
      };
      const errorCallback = (error: any) => {
        setLocError({
          state: true,
          message: error.message,
        });
      };
      navigator.geolocation.getCurrentPosition(successCallback, errorCallback);
    } catch (error) {
      console.log(error);
    }
  }, []);

  function handleLocation() {
    if (locError.state) {
      router.push(`/weather?message=${locError.message}`);
    } else {
      router.push(`/weather?long=${location.long}&lati=${location.lati}`);
    }
  }

  return (
    <>
      <div className="h-screen w-full bg-black   bg-dot-white/[0.2]  relative flex flex-col items-center justify-center">
        {/* Radial gradient for the container to give a faded look */}
        <div className="absolute pointer-events-none inset-0 flex  items-center justify-center bg-black  [mask-image:radial-gradient(ellipse_at_center,transparent_20%,black)]"></div>
        <button onClick={handleLocation} className="mb-4" type="button">
          <LocationIcon />
        </button>
        <p className="text-4xl sm:text-7xl font-bold relative z-20 bg-clip-text text-transparent bg-gradient-to-b from-neutral-200 to-neutral-500 py-8">
          The Weather App
        </p>
      </div>
    </>
  );
}
