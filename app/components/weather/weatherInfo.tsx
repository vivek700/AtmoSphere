import { BackgroundGradient } from '@/app/components/ui/background-gradient'
import { WeatherData } from '@/app/lib/definitions';




export default function WeatherInfo(info: WeatherData) {



  return (
    <div className="max-w-7xl w-10/12 mt-40 mx-auto">
      <BackgroundGradient className="rounded-[22px]  p-4 sm:p-10 bg-zinc-900">

        <p className="text-base sm:text-xl text-black mt-4 mb-2 text-neutral-200">
         {info.name}
        </p>
        
        <p className="text-5xl text-neutral-400" >
          {info.main?.temp ? Math.round(info.main?.temp - 273.15) : 0}&#8451;
        </p>
        
        <button className="rounded-full pl-4 pr-1 py-1 text-white flex items-center space-x-1 bg-black mt-4 text-xs font-bold dark:bg-zinc-800">
          <span>Buy now </span>
          <span className="bg-zinc-700 rounded-full text-[0.6rem] px-2 py-0 text-white">
            $100
          </span>
        </button>

      </BackgroundGradient>
    </div>
  );
}
