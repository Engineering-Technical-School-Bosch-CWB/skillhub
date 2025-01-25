import SingleBarChart from "../../../../components/Charts/SingleBarChart"
import { ISubjectBarChatProps } from "../../interfaces/ClassDetails.interfaces"
import { BarRectangleItem } from "recharts/types/cartesian/Bar"

const SubjectBarChart = ({ data }: ISubjectBarChatProps) => {

    const chartData = [
        {
            label: "Subject Chart",
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
                xAxis="subject"
                yAxis="result"
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

export default SubjectBarChart;