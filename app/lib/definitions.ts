export type WeatherData = {
    coord: {
      lon: number;
      lat: number;
    };
    weather: WeatherDescription[];
    base: string;
    main: {
      temp: number;
      feels_like: number;
      temp_min: number;
      temp_max: number;
      pressure: number;
      humidity: number;
    };
    visibility: number;
    wind: {
      speed: number;
      deg: number;
    };
    clouds: {
      all: number;
    };
    dt: number;
    sys: {
      type: number;
      id: number;
      country: string;
      sunrise: number;
      sunset: number;
    };
    timezone: number;
    id: number;
    name: string;
    cod: number;
  };https://api.openweathermap.org/data/3.0/onecall?lat=${latitude}&lon=${longitude}&appid=${apiKey}&units=metric
  
  type WeatherDescription = {
    id: number;
    main: string;
    description: string;
    icon?: string; // Optional, if the API provides icon information
  };
  

export type cityName = {
  name: string,
  state: string,
  country: string,
}