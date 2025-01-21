import styled from "./styles.module.css"
import getHex from "../../constants/getHex"
import Header from "../../components/Header"
import internalAPI from "../../service/internal.services"
import ExploitationBarChart from "./components/ExploitationBarChart"
import DoughnutChart from "../../components/Charts/DoughnutChart"
import Text from "../../typography"
import Divider from "../../components/Divider"
import ExplorerContainer from "../../components/ExplorerContainer"
import IIdentificationCardProps from "../../components/ExplorerContainer/Components/IdentificationCard/interfaces"

import { useEffect, useState } from "react"
import { IResult } from "../Login/interfaces"
import { toast } from "react-toastify"
import { useNavigate } from "react-router-dom"

const AprenticesResults = () => {

    const navigate = useNavigate();

    const [overallPerformance, setOverAllPerformance] = useState(0);
    const [barChartData, setBarChartData] = useState<IResult[]>([]);
    const [cardsData, setCardsData] = useState<IIdentificationCardProps[]>([]);

    const getData = async () => {
        const response = await internalAPI.jsonRequest("/students/results", "GET");

        if (!response || response.statusCode != 200) {
            if (!toast.isActive("results-load-error"))
                toast.error("Something went wrong.", { toastId: "results-load-error" });
            navigate("/home");
        }

        const content = response.data;
        setOverAllPerformance(content.overallSkillScore ?? 0);

        setBarChartData(content.userResults.map((r: { subject: { curricularUnit: any }; score: any }) => ({
            subject: r.subject.curricularUnit,
            performance: Number((r.score ?? 0).toFixed(2)),
        })));

        setCardsData(content.userResults.map((r: { subject: { curricularUnit: string; beganAt: any }; score: number }) => ({
            title: r.subject.curricularUnit,
            subtitle: r.subject.beganAt,
            iconDetails: Math.round(r.score) + "%",
            color: getHex(r.subject.curricularUnit),
            goTo: "/aprentice/results/subject/8"
        })))
    }

    useEffect(() => {
        getData();
    }, [])

    return (
        <div>
            <Header />
            <main>
                <div className={styled.chart_section}>
                    <Text variant="span" fontWeight="bold" fontSize="xl2">Results</Text>
                    <div className={styled.chart_container}>
                        <ExploitationBarChart data={barChartData} label={"Performance per Subject"} />
                        <DoughnutChart title="Overall Performance" exploitation={Number(overallPerformance.toFixed(1))} />
                    </div>
                </div>
                <Divider size="big" />
                <div className={styled.classes_section}>
                    <ExplorerContainer title={"Subjects"} data={cardsData} />
                </div>
            </main>
        </div>
    )
}

export default AprenticesResults;