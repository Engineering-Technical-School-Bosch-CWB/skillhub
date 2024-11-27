import { BarChart, Bar, Rectangle, XAxis, YAxis, CartesianGrid, Tooltip, Legend } from 'recharts';
import { IBarChartProps } from "../../interfaces/chart.interfaces";

export default function SingleBarChart({ data, xAxis, yAxis }: IBarChartProps) {
  return (
    <div style={{ height: "300px", width: "400px" }}>
      <BarChart
        width={450}
        height={300}
        data={data[0].data} 
        margin={{
          top: 5,
          right: 30,
          left: 20,
          bottom: 5,
        }}
      >
        <CartesianGrid strokeDasharray="4 4" />
        <XAxis dataKey={xAxis} />
        <YAxis dataKey={yAxis} />
        <Tooltip />
        <Bar dataKey={yAxis} fill={"#0197ee"} activeBar={<Rectangle fill="#00629a" />} barSize={45} />
      </BarChart>
    </div>
  );
}
