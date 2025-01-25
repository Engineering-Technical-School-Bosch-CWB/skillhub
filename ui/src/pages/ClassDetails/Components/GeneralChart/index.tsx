import SingleBarChart from "../../../../components/Charts/SingleBarChart";
import { IGeneralChart as IGeneralChartProps } from "../../interfaces/ClassDetails.interfaces"

const GeneralChart = ({ data, onBarClick, selectedId }: IGeneralChartProps) => {

    const chartData = [
        {
            label: "General Performance",
            data: data
        }
    ]

    return (
        <>
            <SingleBarChart
                data={chartData}
                xAxis="name"
                yAxis="grade"
                selectedId={selectedId}
                onBarClick={(e) => onBarClick(e.id)}
                barStyle={{
                    XAxisProps: {
                        angle: 35,
                        height: 75,
                        fontSize: 'small'
                    },
                    ChartProps: {
                        height: 350
                    }
                }}
            />
        </>
    )
}

export default GeneralChart;