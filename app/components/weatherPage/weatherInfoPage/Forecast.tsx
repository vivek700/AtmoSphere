import { LineChart, Line, CartesianGrid, XAxis, YAxis, Tooltip, ZAxis, ResponsiveContainer, Label, LabelList, ComposedChart, Bar } from 'recharts'






const CustomAxisTick = (props: any) => {

    const { x, y, payload } = props

    const value = payload?.value




    return (


        <text x={x} y={y + 8} fill='#ccc' textAnchor="middle" dominantBaseline="middle"   >
            {value}
        </text>




    )
}






const Forecast = ({ data }: { data: any }) => {



    const renderCustomizedLabel = (props: any) => {
        // console.log(props)
        const { x, y, width, height, value } = props;
        const radius = 10;

        return (
            <text x={x + width / 1.7} y={y + 10} fill='#6AE7BC' textAnchor="middle" dominantBaseline="middle">
                {value}
            </text>
        )
    };





    return (
        <>

            <section className="min-w-[280rem]">

                <ResponsiveContainer minWidth={200} minHeight={350}  >
                    {/* <LineChart data={data} */}
                    <ComposedChart data={data}
                        margin={{ top: 50, right: 5, left: 5, bottom: 30, }} >
                        <Line type={"monotone"} dataKey={"temp"} dot={false} stroke="#8884d8" strokeWidth={3} >
                        </Line>

                        <XAxis xAxisId={data?.id} tick={<CustomAxisTick />} tickMargin={5} dataKey={"weather"} type='category' interval={"preserveStart"} tickCount={5} tickSize={12} padding={{ left: 0, right: 0, }} />

                        <YAxis dataKey={"temp"} stroke='#F88379' padding={{ top: 25, bottom: 30, }} axisLine={false} tickLine={false} unit={"°"} interval={"preserveStart"} scale={"linear"} domain={[15, "auto"]} />

                        <Bar xAxisId={data?.id} dataKey={""}   >
                            <LabelList dataKey={"pop"} content={renderCustomizedLabel} />
                            <LabelList dataKey={"dt"} position={"top"} offset={210} />
                            <LabelList dataKey={"wind_speed"} position={"bottom"} offset={70} />
                        </Bar>
                    </ComposedChart>
                </ResponsiveContainer>
            </section>

        </>
    )

}

export default Forecast