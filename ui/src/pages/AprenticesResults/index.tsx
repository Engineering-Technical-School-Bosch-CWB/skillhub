import { formatDate } from "../../constants/Date"
import styles from "./styles.module.css"
import getColor from "../../constants/getHex"
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
import SectionHeader from "@/components/SectionHeader"
import Progress from "@/components/Progress"
import { t } from 'i18next';

const AprenticesResults = () => {

    const [loading, setLoading] = useState(true);

    const navigate = useNavigate();

    const [overallPerformance, setOverAllPerformance] = useState(0);
    const [barChartData, setBarChartData] = useState<IResult[]>([]);
    const [cardsData, setCardsData] = useState<IIdentificationCardProps[]>([]);

    const [search, setSearch] = useState("");

    const getData = async () => {
        const response = await internalAPI.jsonRequest(`/students/results?${new URLSearchParams({ query: search })}`, "GET");

        if (!response.success) {
            if (!toast.isActive("results-load-error"))
                toast.error("Something went wrong.", { toastId: "results-load-error" });
            navigate("/home");
        }

        const content = response.data;
        setOverAllPerformance(content.overallSkillScore ?? 0);

        setBarChartData(content.userResults.map((r: { subject: { curricularUnit: any }; score: any }) => ({
            subject: r.subject.curricularUnit,
            performance: r.score == null ? 0 : Number((r.score).toFixed(2)),
        })));

        setCardsData(
            content.userResults
                .filter((r: { search: boolean }) => r.search)
                .map((r: { subject: { curricularUnit: string; beganAt: any; id: string }; score: number }) => ({
                    title: r.subject.curricularUnit,
                    subtitle: r.subject.beganAt ? formatDate(r.subject.beganAt) : t('aprenticesResults.noDate'),
                    iconDetails: Math.round(r.score) + "%",
                    color: getColor(r.subject.curricularUnit),
                    goTo: "/apprentice/results/" + r.subject.id
                }))
        );

        setLoading(false);

    }

    useEffect(() => {
        getData();
    }, [search])

    if (loading)
        return (
            <>
                <Header />
                <Progress />
            </>
        )


    return (
        <div>
            <Header />
            <main>
                <div className={styles.chart_section}>
                    <SectionHeader links={[{
                        label: t('aprenticesResults.generalResults'),
                    }]} />
                    <Text variant="span" fontWeight="bold" fontSize="xl2">{t('aprenticesResults.results')}</Text>
                    <div className={styles.chart_container}>
                        <div className={`${styles.chart}`}>
                            <ExploitationBarChart data={barChartData} label={t('aprenticesResults.performanceSubject')} />
                        </div>
                        <DoughnutChart title={t('aprenticesResults.overallPerformance')} performance={overallPerformance == null ? 0 : Number(overallPerformance.toFixed(1))} />
                    </div>
                </div>
                <Divider size="big" />
                <div className={styles.classes_section}>
                    <ExplorerContainer title={t('aprenticesResults.subjects')} data={cardsData} input={{
                        search: search,
                        onChange: (str: string) => setSearch(str)
                    }} />
                </div>
            </main>
        </div>
    )
}

export default AprenticesResults;