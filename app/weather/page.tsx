import CurrentWeatherInfo from "../components/CurrentWeatherInfo";
import { FetchData } from "../lib/data";

// export async function getData() {
//   "use server";
//   const data = await FetchData();
//   console.log(data);
//   return data;
// }

const Page = async ({ searchParams }: { searchParams: any }) => {
  console.log(searchParams);

  // const { locError } = useWeatherData();

  const longitude: number = Number(searchParams.long);
  const latitude: number = Number(searchParams.lati);

  const message: string | boolean = searchParams.message || false;

  console.log(longitude);
  console.log(latitude);
  console.log(message);

  // console.log(weatherData);

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
