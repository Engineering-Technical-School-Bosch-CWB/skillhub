import { UserSerie } from "react-charts"

export interface IClassCardProps {
    title: string
    startDate: string
    exploitation: number
    color: string
    goTo: string
}

export interface XAxisProps {
    angle?: number,
    textAnchor?: string,
    height?: number,
    fontSize?: string
}

export interface ChartStyleProps {
    width?: number,
    height?: number,
}

export interface barStyleProps {
    XAxisProps?: XAxisProps,
    ChartProps?: ChartStyleProps
}

export interface IBarChartProps {
    data: UserSerie<any>[],
    xAxis: string,
    yAxis: string,
    onBarClick?: Function,
    barStyle?: barStyleProps
}

export interface IDoughnutCharProps {
    exploitation: number
}