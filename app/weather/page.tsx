import CurrentWeatherInfo from "../components/CurrentWeatherInfo";

const Page = async ({
  searchParams,
}: {
  searchParams: { [key: string]: string | undefined };
}) => {
  const longitude: number = Number(searchParams.long);
  const latitude: number = Number(searchParams.lati);

  return (
    <>
      <CurrentWeatherInfo latitude={latitude} longitude={longitude} />
    </>
  );
};

export default Page;
