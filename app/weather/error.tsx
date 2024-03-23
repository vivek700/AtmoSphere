"use client";

import React from "react";

const Error = ({
  error: { message },
  reset,
}: {
  error: Error;
  reset: () => void;
}) => {
  return (
    <div className="text-blue-800 flex flex-col items-center justify-center">
      <p className="mb-2">Error: {message}</p>
      <button
        type="button"
        onClick={reset}
        className="p-2 text-white bg-blue-600 rounded transition-all duration-300 ease-in-out hover:bg-white hover:text-blue-600 hover:scale-105"
      >
        Try Again
      </button>
    </div>
  );
};

export default Error;
