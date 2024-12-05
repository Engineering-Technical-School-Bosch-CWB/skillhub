import SingleBarChart from "../../../../components/SingleBarChart"
import { ContentAreaChartProps, ContentAreaChartValues } from "../../interfaces/ClassDetails.interfaces"
import { BarRectangleItem } from "recharts/types/cartesian/Bar"

export default ({data, onColumnClicked}: ContentAreaChartProps) => {

    const _data: ContentAreaChartValues[] = [
        {
            contentAreaId: 1,
            exploitation:20,
            area:"Backend"
        },
        {
            contentAreaId: 2,
            exploitation:75,
            area:"Frontend"
        },
        {
            contentAreaId: 3,
            exploitation:80,
            area:"Comunicação"
        },
        {
            contentAreaId: 4,
            exploitation:70,
            area:"Power Bi"
        },
        {
            contentAreaId: 5,
            exploitation:89,
            area:"Eletrônica"
        },
        {
            contentAreaId: 6,
            exploitation:89,
            area:"IOT"
        },
        {
            contentAreaId: 7,
            exploitation:89,
            area:"Mecânica"
        },
        {
            contentAreaId: 5,
            exploitation:89,
            area:"Eletrônica"
        },
        {
            contentAreaId: 6,
            exploitation:89,
            area:"IOT"
        },
        {
            contentAreaId: 7,
            exploitation:89,
            area:"Mecânica"
        },
        {
            contentAreaId: 5,
            exploitation:89,
            area:"Eletrônica"
        },
        {
            contentAreaId: 6,
            exploitation:89,
            area:"IOT"
        },
        {
            contentAreaId: 7,
            exploitation:89,
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
                yAxis="exploitation"
                onBarClick={(e: BarRectangleItem) => handleColumn(e)}
                barStyle={{
                    XAxisProps: {
                        angle:-45,
                        textAnchor:'end',
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