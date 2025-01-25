import SingleBarChart from "../../../../components/Charts/SingleBarChart"
import { ContentAreaChartProps, ContentAreaChartValues } from "../../interfaces/ClassDetails.interfaces"
import { BarRectangleItem } from "recharts/types/cartesian/Bar"

export const ContentAreaChart = ({data, onColumnClicked}: ContentAreaChartProps) => {

    const _data: ContentAreaChartValues[] = [
        {
            contentAreaId: 1,
            performance:20,
            area:"Backend"
        },
        {
            contentAreaId: 2,
            performance:75,
            area:"Frontend"
        },
        {
            contentAreaId: 3,
            performance:80,
            area:"Comunicação"
        },
        {
            contentAreaId: 4,
            performance:70,
            area:"Power Bi"
        },
        {
            contentAreaId: 5,
            performance:89,
            area:"Eletrônica"
        },
        {
            contentAreaId: 6,
            performance:89,
            area:"IOT"
        },
        {
            contentAreaId: 7,
            performance:89,
            area:"Mecânica"
        },
        {
            contentAreaId: 5,
            performance:89,
            area:"Eletrônica"
        },
        {
            contentAreaId: 6,
            performance:89,
            area:"IOT"
        },
        {
            contentAreaId: 7,
            performance:89,
            area:"Mecânica"
        },
        {
            contentAreaId: 5,
            performance:89,
            area:"Eletrônica"
        },
        {
            contentAreaId: 6,
            performance:89,
            area:"IOT"
        },
        {
            contentAreaId: 7,
            performance:89,
            area:"Mecânica"
        },
    ]

    const chartData = [
        {
            label: "Content Area",
            data: data ?? _data
        }
    ]

    const handleColumn = (e : any) => {
        onColumnClicked ? onColumnClicked(e.payload) : "";
        return e;
    }

    return (
        <>
            <SingleBarChart 
                data={chartData}
                xAxis="area"
                yAxis="performance"
                onBarClick={(e: BarRectangleItem) => handleColumn(e)}
                barStyle={{
                    XAxisProps: {
                        angle:35,
                        height:75,
                        fontSize:'small'
                    },
                    ChartProps: {
                        height: 350,
                        width: 600
                    }
                }}
            />
        </>
    )
}

export default ContentAreaChart;