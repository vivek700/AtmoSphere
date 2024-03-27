import Link from "next/link";
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

  if (!longitude && !latitude && !message) {
    redirect("/");
  }
  return (
    <>
      {message ? (
        <>
          <h1 className="text-red-600 py-4">{message}</h1>
          <Link href={"/"}>
            <button className="p-2 bg-blue-600 text-white rounded transition-all duration-300 ease-in-out hover:bg-white hover:text-blue-600 hover:scale-105">
              Back to Home
            </button>
          </Link>
        </>
      ) : (
        <>
          <CurrentWeatherInfo latitude={latitude} longitude={longitude} />
        </>
      )}
    </>
  );
};

export default Page;
