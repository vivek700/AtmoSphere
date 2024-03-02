
"use client";
import React from "react";
import { WavyBackground } from "../ui/wavy-background";
import { MovingBorderDemo } from "./MovingBorder";

export function WavyBackgroundDemo() {
  return (
    <WavyBackground className="max-w-4xl mx-auto pb-40 text-center">
        <MovingBorderDemo />
      <p className="text-2xl md:text-4xl lg:text-7xl text-white font-bold inter-var text-center">
        The Weather App
      </p>
      <p className="text-base md:text-lg mt-4 text-white font-normal inter-var text-center">
        Leverage the power of Weather App
      </p>
    </WavyBackground>
  );
}
