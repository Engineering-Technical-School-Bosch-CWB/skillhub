import styled from "./styles.module.css";
import { BarChart, Bar, Rectangle, XAxis, YAxis, CartesianGrid, Tooltip } from 'recharts';
import { IBarChartProps } from './interfaces';
import Text from "../../../typography";

export default function SingleBarChart({ data, xAxis, yAxis, title }: IBarChartProps) {
  return (
    <div style={{ height: "250px", width: "450px" }} className={styled.container}>
      <Text>{ title }</Text>
      <BarChart
        width={450}
        height={250}
        data={data[0].data} 
        margin={{
          top: 30,
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
