import SingleBarChart from "../../../../components/Charts/SingleBarChart"
import { ContentAreaChartProps } from "../../interfaces/ClassDetails.interfaces"

export const ContentAreaChart = ({ data, onBarClick, selectedId }: ContentAreaChartProps) => {

    const chartData = [
        {
            label: "Content Area",
            data: data
        }
    ]
    
    return (
        <>
            <SingleBarChart 
                data={chartData}
                xAxis="area"
                yAxis="performance"
                selectedId={selectedId}
                onBarClick={(e) => onBarClick(e.id)}
                barStyle={{
                    XAxisProps: {
                        angle:35,
                        height:75,
                        fontSize:'small'
                    },
                    ChartProps: {
                        height: 350,
                    }
                }}
            />
        </>
    )
}

export default ContentAreaChart;