import { UserSerie } from "react-charts"

export interface IClassCardProps {
    title: string
    startDate: string
    exploitation: number
}

export interface IBarChartProps {
    data: UserSerie<any>[],
    xAxis: string,
    yAxis: string
}

export interface IDoughnutCharProps {
    exploitation: number
}