"use client";
import useTimeDate from "@/app/hooks/useTimeDate";
import { HourlyWeatherData } from "@/app/lib/definitions";
import {
  Line,
  XAxis,
  YAxis,
  ResponsiveContainer,
  LabelList,
  ComposedChart,
  Bar,
} from "recharts";

const CustomAxisTick = (props: any) => {
  const { x, y, payload } = props;

  const labelParts = payload.value.split(" ");

  return (
    <text
      x={x}
      y={y + 8}
      fill="#ccc"
      textAnchor="middle"
      dominantBaseline="middle"
    >
      {labelParts[0]}
      <tspan x={x} dy={18}>
        {labelParts[1]}
      </tspan>
    </text>
  );
};

const Forecast = ({
  hourly,
  timezone_offset,
}: {
  hourly: HourlyWeatherData[];
  timezone_offset: number;
}) => {
  const [convertUnixTo12hFormat] = useTimeDate();

  const hourlyData = hourly?.map((data: HourlyWeatherData) => ({
    ...data,
    time: convertUnixTo12hFormat(data.dt, timezone_offset).hours,
  }));

  const renderCustomizedLabel = (props: any) => {
    // console.log(props)
    const { x, y, width, height, value } = props;

    return (
      <text
        x={x + width / 1.7}
        y={y + 20}
        fill="#6AE7BC"
        textAnchor="middle"
        dominantBaseline="middle"
      >
        {value}
      </text>
    );
  };

  return (
    <>
      <section className="min-w-[220rem]">
        <ResponsiveContainer minWidth={200} minHeight={350}>
          <ComposedChart
            data={hourlyData}
            margin={{ top: 50, right: 5, left: 5, bottom: 50 }}
          >
            <Line
              type={"monotone"}
              dataKey={"temp"}
              dot={false}
              stroke="#8884d8"
              strokeWidth={2}
            ></Line>

            <XAxis
              tick={<CustomAxisTick />}
              tickMargin={5}
              dataKey={"description"}
              type="category"
              interval={0}
              tickSize={12}
              padding={{ left: 0, right: 0 }}
            />

            <YAxis
              dataKey={"temp"}
              type="number"
              stroke="#F88379"
              padding={{ top: 25, bottom: 30 }}
              axisLine={false}
              tickLine={false}
              unit={"°"}
              // tickCount={5}
              interval={"preserveEnd"}
              // scale={"linear"}
              // includeHidden={true}
              domain={["auto", "auto"]}
            />

            <Bar dataKey={""}>
              <LabelList dataKey={"pop"} content={renderCustomizedLabel} />
              <LabelList dataKey={"time"} position={"top"} offset={210} />
              <LabelList
                dataKey={"wind_speed"}
                position={"bottom"}
                offset={95}
              />
            </Bar>
          </ComposedChart>
        </ResponsiveContainer>
      </section>
    </>
  );
};

export default Forecast;
