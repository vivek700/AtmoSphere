import { Metadata } from "next";
import WeatherInfo from "../components/weatherPage/weatherInfoPage/WeatherInfo";



export const metadata: Metadata = {
  title: "Weather and Forecast",
  description: "Get instant, hyperlocal weather updates tailored to your exact location."
}



const Page = () => {


  return (
    <>
      <WeatherInfo />
    </>
  )
}



export default Page

