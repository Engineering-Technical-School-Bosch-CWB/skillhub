import { BarChart, Bar, Rectangle, XAxis, YAxis, CartesianGrid, Tooltip } from 'recharts';
import { IBarChartProps } from '../../interfaces/aprenticeResults.interfaces';

export default function SingleBarChart({ data, xAxis, yAxis }: IBarChartProps) {
  return (
    <div style={{ height: "250px", width: "450px" }}>
      <BarChart
        width={450}
        height={250}
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
