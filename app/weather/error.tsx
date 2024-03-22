"use client";

import React from "react";

const Error = ({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) => {
  return <div className="text-blue-800">Error: {error.message}</div>;
};

export default Error;
