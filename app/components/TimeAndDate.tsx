"use client";

import useTimeDate from "../hooks/useTimeDate";

const TimeAndDate = ({
  dt,
  timezone_offset,
}: {
  dt: number;
  timezone_offset: number;
}) => {
  const [convertUnixTo12hFormat] = useTimeDate();

  const time = convertUnixTo12hFormat(dt, timezone_offset).timeWithDate;

  return <p className=" text-red-400">{time}</p>;
};

export default TimeAndDate;
