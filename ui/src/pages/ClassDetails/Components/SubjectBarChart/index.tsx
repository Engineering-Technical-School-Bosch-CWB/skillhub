import SingleBarChart from "../../../../components/Charts/SingleBarChart"
import { SubjectExploitation } from "../../interfaces/ClassDetails.interfaces"
import { BarRectangleItem } from "recharts/types/cartesian/Bar"

export default () => {

    const data: SubjectExploitation[] = [
        {
            subjectId: 1,
            result:20,
            subject:"C# avançado"
        },
        {
            subjectId: 2,
            result:75,
            subject:"C# Básico"
        },
        {
            subjectId: 3,
            result:80,
            subject:"Lógica de Prog"
        },
        {
            subjectId: 4,
            result:70,
            subject:"Banco de Dados"
        },
        {
            subjectId: 5,
            result:89,
            subject:"WEB"
        },
    ]

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