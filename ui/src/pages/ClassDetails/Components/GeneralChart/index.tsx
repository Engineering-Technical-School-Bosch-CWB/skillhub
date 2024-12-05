import SingleBarChart from "../../../../components/SingleBarChart"
import { GeneralExplotaitionChartProps, SubjectExploitation } from "../../interfaces/ClassDetails.interfaces"
import { BarRectangleItem } from "recharts/types/cartesian/Bar"

export default () => {

    const data: GeneralExplotaitionChartProps[] = [
        {
            student: {
                name: 'Alice S.'
            },
            grade: 6
        },
        {
            student: {
                name: 'Bruno C.'
            },
            grade: 80
        },
        {
            student: {
                name: 'Carla M.'
            },
            grade: 89
        },
        {
            student: {
                name: 'Diego N.'
            },
            grade: 100
        },
        {
            student: {
                name: 'Fernanda R.'
            },
            grade: 45
        }
    ];

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
                xAxis="student.name"
                yAxis="grade"
                onBarClick={(e: BarRectangleItem) => redirect(e)}
                barStyle={{
                    XAxisProps: {
                        angle:-45,
                        textAnchor:'end',
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