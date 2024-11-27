import { AxisOptions, UserSerie } from "react-charts";

// export interface IBarChartProps {
//     data: UserSerie<any>[],
//     primaryAxis: AxisOptions<any>,
//     secondaryAxes: AxisOptions<any>[]
// }

export interface IBarChartProps {
    data: UserSerie<any>[],
    xAxis: string,
    yAxis: string
}

export interface IDoughnutCharProps {
    exploitation: number
}