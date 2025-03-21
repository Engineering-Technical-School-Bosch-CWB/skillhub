import styled from "./styles.module.css";
import Divider from "../../components/Divider";
import DoughnutChart from "../../components/Charts/DoughnutChart";
import Header from "../../components/Header";
import Text from "../../typography";
import TableView from "../../components/TableView";
import { formatDate } from "../../constants/formatDate";
import HistoryModal from "./components/HistoryModal";
import internalAPI from "../../service/internal.services";

import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import { useNavigate, useParams } from "react-router-dom";
import { IFeedback } from "../../interfaces/models/IFeedback";
import { IOption } from "../../components/TableView/interfaces";
import SectionHeader from "@/components/SectionHeader";
import Progress from "@/components/Progress";
import { t } from 'i18next';

const SubjectResults = () => {

    const [loading, setLoading] = useState(true);

    const { subjectId } = useParams();

    const navigate = useNavigate();

    const [isHistoryModalOpen, setIsHistoryModalOpen] = useState(false);
    const [selectedSkill, setSelectedSkill] = useState<number>();

    const [subject, setSubject] = useState("");
    const [feedback, setFeedback] = useState<IFeedback | null>(null);
    const [overallPerformance, setOverallPerformance] = useState(0);
    const [classOverallPerformance, setClassOverallPerformance] = useState(0);
    const [skillsData, setSkillsData] = useState([]);

    const getData = async () => {
        const response = await internalAPI.jsonRequest(`/students/results/${subjectId}`, "GET");

        if (!response.success) {
            if (!toast.isActive("subject-results-load-error"))
                toast.error("Something went wrong.", { toastId: "subject-results-load-error" });
            navigate("/apprentice/results");
        }

        const content = response.data;

        setSubject(content.subject);
        setFeedback(content.feedback);
        setOverallPerformance(content.overallSkillScore);
        setClassOverallPerformance(content.classOverallSkillScore);
        setSkillsData(content.skillResults.map((r: { skillId: number; description: string; aptitude: string; classPercentageAptitude: string; }) => ({
            id: r.skillId,
            description: r.description,
            aptitude: r.aptitude,
            average_performance: r.classPercentageAptitude
        })));

        setLoading(false);
    }

    const handleHistoryModal = (isOpen: boolean, skillId: number) => {
        setIsHistoryModalOpen(isOpen);
        setSelectedSkill(skillId);
    }

    const options: IOption[] = [
        {
            iconName: "history",
            function: handleHistoryModal
        }
    ]

    useEffect(() => {
        getData();
    }, [])

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
                <div className={styled.content}>
                    <SectionHeader links={[{
                        label: t('subjectResults.generalResults'),
                        goTo: "/apprentice/results"
                    },
                    {
                        label: subject
                    }]} />
                    <div className={styled.overview_section}>
                        <Text fontWeight="bold" fontSize="xl2">{subject}</Text>
                        <div className={styled.overview_content}>
                            <div className={styled.feedback_card}>
                                <Text fontWeight="semibold" fontSize="xl">Feedback</Text>
                                <Text>{feedback?.content || t('subjectResults.nofeedback')}</Text>
                                <div className={styled.feedback_author}>
                                    {
                                        feedback &&
                                        <>
                                            <Text fontWeight="light" fontSize="sm">{t('subjectDetails.lastUpdate')}</Text>
                                            <Text fontWeight="semibold" fontSize="sm">{formatDate(feedback.updatedAt) + t('subjectResults.by') + feedback.instructor}</Text>
                                        </>
                                    }
                                </div>
                            </div>
                            <DoughnutChart performance={overallPerformance == null ? 0 : Number((overallPerformance).toFixed(1))} title={t('subjectResults.yourPerformance')} />
                            <DoughnutChart performance={classOverallPerformance == null ? 0 : Number((classOverallPerformance).toFixed(1))} title={t('subjectResults.classPerformance')} />
                        </div>
                    </div>
                    <Divider size="big" />
                    <div className={styled.competences_section}>
                        <Text fontWeight="bold" fontSize="xl2">{t('subjectResults.skills')}</Text>
                        <div className={styled.table_container}>
                            <TableView data={skillsData} hasNotation={true} hasOptions={true} options={options} />
                        </div>
                    </div>
                </div>

                {
                    selectedSkill &&
                    <HistoryModal isOpen={isHistoryModalOpen} handleIsOpen={handleHistoryModal} skillId={selectedSkill} />
                }
            </main>
        </div>
    )
}

export default SubjectResults;