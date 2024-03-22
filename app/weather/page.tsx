import CurrentWeatherInfo from "../components/CurrentWeatherInfo";
import { redirect } from "next/navigation";

const Page = async ({
  searchParams,
}: {
  searchParams: { [key: string]: string | undefined };
}) => {
  const longitude: number = Number(searchParams.long);
  const latitude: number = Number(searchParams.lati);

  const message: string | boolean = searchParams.message || false;

  // console.log(longitude);
  // console.log(latitude);
  // console.log(message);

  // console.log(weatherData);

  if (!longitude && !latitude && !message) {
    redirect("/");
  }

  return (
    <>
      {message ? (
        <h1 className="text-red-600">{message}</h1>
      ) : (
        <>
          <CurrentWeatherInfo latitude={latitude} longitude={longitude} />
        </>
      )}
    </>
  );
};

export default Page;
