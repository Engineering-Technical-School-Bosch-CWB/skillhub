import styles from './styles.module.css';
import { BarChart, Bar, Rectangle, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { IBarChartProps } from "./interfaces";
import { BarRectangleItem } from 'recharts/types/cartesian/Bar';
import Text from "../../../typography";

const CustomBar = ({ fill, x, y, width, height, onClick }: any) => {
  return (
    <Rectangle
      fill={fill}
      x={x}
      y={y}
      width={width}
      height={height}
      onClick={onClick}
    />
  );
};

export default function SingleBarChart({ data, xAxis, yAxis, onBarClick, barStyle, selectedId }: IBarChartProps) {

  return (
    <div className={styles.container}>
      <div className={`${styles.bar_title}`}>
        <Text>{data[0].label}</Text>
      </div>

      <ResponsiveContainer width={barStyle?.ChartProps?.width ?? "100%"} height={barStyle?.ChartProps?.height ?? 250}>
        <BarChart
          data={data[0].data}
          margin={{
            top: 30,
            right: 30,
            left: 20,
            bottom: 5,
          }} >
          <CartesianGrid strokeDasharray="4 4" />
          <XAxis
            dataKey={xAxis}
            angle={barStyle?.XAxisProps?.angle}
            textAnchor={barStyle?.XAxisProps?.textAnchor}
            height={barStyle?.XAxisProps?.height}
            fontSize={barStyle?.XAxisProps?.fontSize}
          />
          <YAxis dataKey={yAxis} domain={[0, 100]} />
          <Tooltip />
          <Bar
            className={`${styles.bar} ${!onBarClick ? "" : styles.pointer}`}
            dataKey={yAxis}
            barSize={30}
            onClick={(e: BarRectangleItem, _i, _e) => {
              _e.stopPropagation();
              onBarClick ? onBarClick(e) : ""
            }}
            shape={(props: any) => {
              const { payload } = props;
              return <CustomBar {...props} fill={payload.id === selectedId ? "#00629a" : "#0197ee"} />;
            }}
          />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
}