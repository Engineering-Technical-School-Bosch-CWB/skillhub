import { t } from "i18next";
import SingleBarChart from "../../../../components/Charts/SingleBarChart";
import { IGeneralChart as IGeneralChartProps } from "../../interfaces/ClassDetails.interfaces"

const GeneralChart = ({ data, onBarClick, selectedId }: IGeneralChartProps) => {

    const chartData = [
        {
            label: t('classDetails.studentPerformance'),
            data: data
        }
    ]

    return (
        <>
            <SingleBarChart
                data={chartData}
                xAxis="name"
                yAxis="performance"
                selectedId={selectedId}
                onBarClick={(e) => onBarClick(e.id)}
                barStyle={{
                    XAxisProps: {
                        angle: 35,
                        height: 75,
                        fontSize: 'small'
                    },
                    ChartProps: {
                        height: 350,
                    }
                }}
            />
        </>
    )
}

export default GeneralChart;