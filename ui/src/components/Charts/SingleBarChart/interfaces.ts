import { UserSerie } from "react-charts";

export interface IXAxisProps {
    angle?: number,
    textAnchor?: string,
    height?: number,
    fontSize?: string
}

export interface IChartStyleProps {
    width?: number,
    height?: number,
}

export interface IBarStyleProps {
    XAxisProps?: IXAxisProps,
    ChartProps?: IChartStyleProps
}

export interface IBarChartProps {
    data: UserSerie<any>[],
    xAxis: string,
    yAxis: string,
    onBarClick?: (...props: any[]) => void,
    barStyle?: IBarStyleProps,
    selectedId?: number | null
}

export interface IDoughnutCharProps {
    exploitation: number
}