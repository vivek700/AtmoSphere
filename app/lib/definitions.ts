export type WeatherData = {
  id: string
  timezone_offset: number
  country: string
  cityName: string
  state: string
  current: CurrentWeatherData
  daily: DailyWeatherData[]
  hourly: HourlyWeatherData[]
}

export type CurrentWeatherData = {
  id: string
  icon: string
  main: string
  clouds: number
  dew_point: number
  dt: number
  time: string
  feels_like: number
  humidity: number
  pressure: number
  temp: number
  uvi: number
  visibility: number
  wind_speed: string
  wind_deg: number

}

export type DailyWeatherData = {
  id: string
  icon: string
  description: string
  clouds: number
  dew_point: number
  dt: number
  time: string
  feels_like: {
    day: number
    eve: number
    morn: number
    night: number

  }
  humidity: number
  temp: {
    day: number
    eve: number
    max: number
    min: number
    morn: number
    night: number

  }
  pop: number
  pressure: number
  uvi: number
  visibility: number
  wind_speed: string
  wind_deg: number
  sunrise: string
  sunset: string
  sunriseT: number
  sunsetT: number

}

export type HourlyWeatherData = {

  id: string
  clouds: number
  dt: number
  time: string
  temp: number
  wind_speed: string
  pop: string
  description: string

}


export type LocationData = {
  name: string
  country: string
  state: string
}
export type TimeData = {
  timeWithDate: string
  time: string
  hours: string
  date: string
}

export type city = {
  state: string
  country: string
  name: string
  lon: number
  lat: number
}