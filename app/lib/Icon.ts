import {
  faCircle,
  faCloud,
  faCloudSun,
  faCloudMoon,
  faCloudMeatball,
  faCloudShowersHeavy,
  faCloudSunRain,
  faCloudMoonRain,
  faCloudBolt,
  faSnowflake,
  faSun,
  faTemperatureArrowDown,
  faTemperatureArrowUp,
  faTemperatureHalf,
} from "@fortawesome/free-solid-svg-icons";

export function Icon(iconStr: string) {
  let iconName;
  switch (iconStr) {
    case "50d":
      iconName = faTemperatureArrowUp;
      break;
    case "50n":
      iconName = faTemperatureArrowDown;
      break;
    case "01d":
      iconName = faSun;
      break;
    case "01n":
      iconName = faCircle;
      break;
    case "02d":
      iconName = faCloudSun;
      break;
    case "02n":
      iconName = faCloudMoon;
      break;
    case "03d":
      iconName = faCloud;
      break;
    case "03n":
      iconName = faCloud;
      break;
    case "04d":
      iconName = faCloudMeatball;
      break;
    case "04n":
      iconName = faCloudMeatball;
      break;
    case "09d":
      iconName = faCloudShowersHeavy;
      break;
    case "09n":
      iconName = faCloudShowersHeavy;
      break;
    case "10d":
      iconName = faCloudSunRain;
      break;
    case "10n":
      iconName = faCloudMoonRain;
      break;
    case "11d":
      iconName = faCloudBolt;
      break;
    case "11n":
      iconName = faCloudBolt;
      break;
    case "13d":
      iconName = faSnowflake;
      break;
    case "13n":
      iconName = faSnowflake;
      break;

    default:
      iconName = faTemperatureHalf;
  }
  return iconName;
}
