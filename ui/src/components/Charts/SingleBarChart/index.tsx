import styles from './styles.module.css';
import { BarChart, Bar, Rectangle, XAxis, YAxis, CartesianGrid, Tooltip } from 'recharts';
import { IBarChartProps } from "./interfaces";
import { BarRectangleItem } from 'recharts/types/cartesian/Bar';
import Text from "../../../typography";


export default function SingleBarChart({ data, xAxis, yAxis, onBarClick, barStyle }: IBarChartProps) {

  return (
    <div style={{ 
        height: `${barStyle?.ChartProps?.height ?? '250px'}`, 
        width:  `${barStyle?.ChartProps?.height ?? '450px'}` 
      }}>
      <div className={`${styles.bar_title}`}>
        <Text>{data[0].label}</Text>
      </div>

      <BarChart
        width={barStyle?.ChartProps?.width ?? 450}
        height={barStyle?.ChartProps?.height ?? 250}
        data={data[0].data} 
        margin={{
          top: 30,
          right: 30,
          left: 20,
          bottom: 5,
        }}
      >
        <CartesianGrid strokeDasharray="4 4" />
        <XAxis 
          dataKey={xAxis} 
          angle={barStyle?.XAxisProps?.angle} 
          textAnchor={barStyle?.XAxisProps?.textAnchor}
          height={barStyle?.XAxisProps?.height} 
          fontSize={barStyle?.XAxisProps?.fontSize} 
        />
        <YAxis dataKey={yAxis} />
        <Tooltip />
        <Bar 
          className={`${styles.bar}`}
          dataKey={yAxis} 
          fill={"#0197ee"} 
          activeBar={<Rectangle fill="#00629a" />} 
          barSize={45} 
          onClick={(e: BarRectangleItem) => onBarClick? onBarClick(e) : "" } 
        />
      </BarChart>
    </div>
  );
}
