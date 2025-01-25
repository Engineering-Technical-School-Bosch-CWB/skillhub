import SingleBarChart from "../../../../components/Charts/SingleBarChart";
import { GeneralExplotaitionChartProps, IGeneralChart as IGeneralChartProps } from "../../interfaces/ClassDetails.interfaces"
import { BarRectangleItem } from "recharts/types/cartesian/Bar"

const GeneralChart = ({ data }: IGeneralChartProps) => {

    const chartData = [
        {
            label: "General Exploitation",
            data: data
        }
    ]

    const redirect = (e: any) => {
        console.log(e.payload.subjectId);
        
    }

    return (
        <>
            <SingleBarChart 
                data={chartData}
                xAxis="name"
                yAxis="grade"
                onBarClick={(e: BarRectangleItem) => redirect(e)}
                barStyle={{
                    XAxisProps: {
                        angle:35,
                        height:75,
                        fontSize:'small'
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