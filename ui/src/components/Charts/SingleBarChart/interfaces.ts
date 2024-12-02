import { UserSerie } from "react-charts";

export interface IBarChartProps {
    data: UserSerie<any>[],
    xAxis: string,
    yAxis: string,
    title: string
}