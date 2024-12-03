import styled from "./styles.module.css";
import Divider from "../../components/Divider";
import DoughnutChart from "../../components/Charts/DoughnutChart";
import Header from "../../components/Header";
import Text from "../../typography";
import TableView from "../../components/TableView";
import { useState } from "react";
import { IOption } from "../../components/TableView/interfaces";
import ContestmentModal from "./components/ContestmentModal";
import HistoryModal from "./components/HistoryModal";

const data = [
    {
        id: 1,
        name: "Use I/O operations.",
        status: "Apt",
        average_aptitude: 90
    },
    {
        id: 2,
        name: "Use generics.",
        status: "Inapt",
        average_aptitude: 68,
    },
    {
        id: 3,
        name: "Array usage.",
        status: "In Development",
        average_aptitude: 30,
    },
]

const SubjectResults = () => {
    const [isHistoryModalOpen, setIsHistoryModalOpen] = useState(false);
    const [isContestmentModalOpen, setIsContestmentModalOpen] = useState(false);
    const [selectedCompetence, setSelectedCompetence] = useState(-1);

    const handleHistoryModal = (isOpen: boolean, competenceId: number) => {
        setIsHistoryModalOpen(isOpen);
        setSelectedCompetence(competenceId);
    }

    const handleContestmentModal = (isOpen: boolean, competenceId: number) => {
        setIsContestmentModalOpen(isOpen);
        setSelectedCompetence(competenceId);
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
    
    return (
        <div>
            <Header/>
            <main>
                <div className={styled.content}>
                    <div className={styled.overview_section}>
                        <Text fontWeight="bold" fontSize="xl2">Python</Text>
                        <div className={styled.overview_content}>
                            <div className={styled.feedback_card}>
                                <Text fontWeight="semibold" fontSize="xl">Feedback</Text>
                                <Text>Você atingiu mais de 80% de cada objetivo. Foque em aprender métodos de Hash e continue assim !</Text>
                                <div className={styled.feedback_author}>
                                    <Text fontWeight="light" fontSize="sm">18/10/2024 - Leonardo Trevisan</Text>
                                </div>
                            </div>
                            <div className={styled.chart_section}>
                                <DoughnutChart exploitation={60} title="Your Exploitation"/>
                                <DoughnutChart exploitation={57} title="Class' Average Exploitation"/>
                            </div>
                        </div>
                    </div>
                    <Divider size="big"/>
                    <div className={styled.competences_section}>
                        <Text fontWeight="bold" fontSize="xl2">Competences</Text>
                        <div className={styled.competences_content}>
                            <TableView data={data} hasNotation={true} hasOptions={true} options={options}/>
                        </div>
                    </div>
                </div>

                <ContestmentModal isOpen={isContestmentModalOpen} handleIsOpen={handleContestmentModal} competenceId={selectedCompetence}/>
                <HistoryModal isOpen={isHistoryModalOpen} handleIsOpen={handleHistoryModal} competenceId={selectedCompetence}/>
            </main>
        </div>
    )
}

export default SubjectResults;