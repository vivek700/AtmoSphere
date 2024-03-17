
import LocationIcon from "@/app/icon/LocationIcon";
import Link from "next/link";
import React from "react";

export function MainPage() {
  return (
    <>
      <div className="h-screen w-full bg-black   bg-dot-white/[0.2]  relative flex flex-col items-center justify-center">
        {/* Radial gradient for the container to give a faded look */}
        <div className="absolute pointer-events-none inset-0 flex  items-center justify-center bg-black  [mask-image:radial-gradient(ellipse_at_center,transparent_20%,black)]"></div>
        <Link href={"/weather"}>
          <button className="mb-4" type="button"><LocationIcon /></button>
        </Link>
        <p className="text-4xl sm:text-7xl font-bold relative z-20 bg-clip-text text-transparent bg-gradient-to-b from-neutral-200 to-neutral-500 py-8">
          The Weather App
        </p>
      </div>



    </>


  );
}

