import { t } from "i18next"
import SingleBarChart from "../../../../components/Charts/SingleBarChart"
import { ISubjectBarChatProps } from "../../interfaces/ClassDetails.interfaces"

const SubjectBarChart = ({ data, onBarClick, selectedId }: ISubjectBarChatProps) => {

    const chartData = [
        {
            label: t('classDetails.subjectPerformance'),
            data: data
        }
    ]

    return (
        <>
            <SingleBarChart 
                data={chartData}
                xAxis="subject"
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

export default SubjectBarChart;