import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faWind } from "@fortawesome/free-solid-svg-icons";

const WindDir = ({ deg, wind_speed }: { deg: number; wind_speed: string }) => {
  const directions = ["N", "NE", "E", "SE", "S", "SW", "W", "NW"];
  const index = Math.round((deg % 360) / 45) % 8;
  const windDir = `${wind_speed} ${directions[index]}`;
  return (
    <>
      <FontAwesomeIcon icon={faWind} className={`inline pr-1 w-4`} />
      {windDir}
    </>
  );
};

export default WindDir;
