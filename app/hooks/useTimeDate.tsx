"use client"

import { TimeData } from "../lib/definitions";

const useTimeDate = () => {

  function convertUnixTo12hFormat(unixTimestamp: number, timeZoneOffset: number): TimeData {

    const date = new Date(unixTimestamp * 1000); // Convert timestamp to Date object
    date.setTime(date.getTime() + timeZoneOffset)
    const hours = date.getHours() % 12 || 12;  // Adjust for 12-hour format
    const minutes = date.getMinutes().toString().padStart(2, '0');
    const amPm = date.getHours() < 12 ? 'am' : 'pm';

    const formattedTime = date.toLocaleTimeString("en-IN", {
      day: "numeric",
      month: "short",
      hour: "numeric",
      minute: "numeric",
      hour12: true,
    });

    const formattedDate = `${date.toLocaleString('en-US', {
      weekday: 'short',
      month: 'short',
      day: 'numeric'
    })}`;


    const timedata: TimeData = {
      timeWithDate: formattedTime,
      time: `${hours}:${minutes}${amPm}`,
      hours: `${hours}${amPm}`,
      date: formattedDate
    }

    // console.log(timeZoneOffset)
    return timedata;
  }

  return [convertUnixTo12hFormat]

}

export default useTimeDate