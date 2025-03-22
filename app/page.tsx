"use client";

import { useRouter } from "next/navigation";

export default function Home() {
  const router = useRouter()

  function handleLocation() {

    try {
      const lati = 28.6517178
      const long = 77.2219388
      const query = `long=${long}&lati=${lati}`
      router.push(`/weather?${query}`);
    } catch (error) {
      console.log(error)
    }
  }

  return (
    <>
      <div className="h-dvh w-full bg-black   bg-dot-white/[0.2]  relative flex flex-col items-center justify-center">
        {/* Radial gradient for the container to give a faded look */}
        <div className="absolute pointer-events-none inset-0 flex  items-center justify-center bg-black  [mask-image:radial-gradient(ellipse_at_center,transparent_20%,black)]"></div>
        <button
          type="button"
          onClick={handleLocation}
          className="mb-2 flex justify-center items-center transition duration-300 ease-in-out space-x-2 text-white font-semibold bg-cyan-500 px-5 py-3 rounded-full  hover:bg-cyan-600 shadow-lg  shadow-cyan-500/50 focus:outline-none focus:ring focus:ring-cyan-300"
        >
          Get Started
        </button>
        <p className="text-4xl sm:text-7xl font-bold relative z-20 bg-clip-text text-transparent bg-gradient-to-b from-neutral-200 to-neutral-500 py-8">
          AtmoSphere
        </p>
      </div>
    </>
  );
}
