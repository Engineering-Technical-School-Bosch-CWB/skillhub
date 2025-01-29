import styled from "./styles.module.css";
import Divider from "../../components/Divider";
import DoughnutChart from "../../components/Charts/DoughnutChart";
import Header from "../../components/Header";
import Text from "../../typography";
import TableView from "../../components/TableView";
import formatDate from "../../constants/formatDate";
import HistoryModal from "./components/HistoryModal";
import internalAPI from "../../service/internal.services";
import ContestmentModal from "./components/ContestmentModal";

import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import { useNavigate, useParams } from "react-router-dom";
import { IFeedback } from "../../interfaces/models/IFeedback";
import { IOption } from "../../components/TableView/interfaces";
import SectionHeader from "@/components/SectionHeader";

const SubjectResults = () => {

    const { subjectId } = useParams();

    const navigate = useNavigate();

    const [isHistoryModalOpen, setIsHistoryModalOpen] = useState(false);
    const [isContestmentModalOpen, setIsContestmentModalOpen] = useState(false);
    const [selectedSkill, setSelectedSkill] = useState(-1);

    const [subject, setSubject] = useState("");
    const [feedback, setFeedback] = useState<IFeedback | null>(null);
    const [overallPerformance, setOverallPerformance] = useState(0);
    const [classOverallPerformance, setClassOverallPerformance] = useState(0);
    const [skillsData, setSkillsData] = useState([]);

    const getData = async () => {
        const response = await internalAPI.jsonRequest(`/students/results/${subjectId}`, "GET");

        if (!response || response.statusCode != 200) {
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
        })))
    }

    const handleHistoryModal = (isOpen: boolean, skillId: number) => {
        setIsHistoryModalOpen(isOpen);
        setSelectedSkill(skillId);
    }

    const handleContestmentModal = (isOpen: boolean, skillId: number) => {
        setIsContestmentModalOpen(isOpen);
        setSelectedSkill(skillId);
    }

    const options: IOption[] = [
        {
            iconName: "history",
            function: handleHistoryModal
        },
        {
            iconName: "priority_high",
            function: handleContestmentModal
        }
    ]

    useEffect(() => {
        getData();
    }, [])

    return (
        <div>
            <Header />
            <main>
                <div className={styled.content}>
                    <SectionHeader links={[{
                        label: "General Results",
                        goTo: "/apprentice/results"
                    },
                    {
                        label: subject + " Results"
                    }]} />
                    <div className={styled.overview_section}>
                        <Text fontWeight="bold" fontSize="xl2">{subject}</Text>
                        <div className={styled.overview_content}>
                            <div className={styled.feedback_card}>
                                <Text fontWeight="semibold" fontSize="xl">Feedback</Text>
                                <Text>{feedback?.content || "No feedback provided."}</Text>
                                <div className={styled.feedback_author}>
                                    {
                                        feedback &&
                                        <>
                                            <Text fontWeight="light" fontSize="sm">Last update • </Text>
                                            <Text fontWeight="semibold" fontSize="sm">{formatDate(feedback.updatedAt) + " by " + feedback.instructor}</Text>
                                        </>
                                    }
                                </div>
                            </div>
                            <div className={styled.chart_section}>
                                <DoughnutChart exploitation={overallPerformance == null ? 0 : Number((overallPerformance).toFixed(1))} title="Your Performance" />
                                <DoughnutChart exploitation={classOverallPerformance == null ? 0 : Number((classOverallPerformance).toFixed(1))} title="Average Class Performance" />
                            </div>
                        </div>
                    </div>
                    <Divider size="big" />
                    <div className={styled.competences_section}>
                        <Text fontWeight="bold" fontSize="xl2">Skills</Text>
                        <div className={styled.table_container}>
                            <TableView data={skillsData} hasNotation={true} hasOptions={true} options={options} />
                        </div>
                    </div>
                </div>

                <ContestmentModal isOpen={isContestmentModalOpen} handleIsOpen={handleContestmentModal} skillId={selectedSkill} />
                <HistoryModal isOpen={isHistoryModalOpen} handleIsOpen={handleHistoryModal} skillId={selectedSkill} />
            </main>
        </div>
    )
}

export default SubjectResults;