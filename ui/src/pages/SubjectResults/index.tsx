import styled from "./styles.module.css";
import Divider from "../../components/Divider";
import DoughnutChart from "../../components/Charts/DoughnutChart";
import Header from "../../components/Header";
import Text from "../../typography";
import TableView from "../../components/TableView";
import { useState } from "react";

const data = [
    {
        name: "Use I/O operations.",
        status: "Apt",
        average_aptitude: 90
    },
    {
        name: "Use generics.",
        status: "Inapt",
        average_aptitude: 68,
    },
    {
        name: "Array usage.",
        status: "In Development",
        average_aptitude: 30,
    },
]

const SubjectResults = () => {
    const [isHistoryModalOpen, setIsHistoryModalOpen] = useState(false);
    const [isContestmentModalOpen, setIsContestmentModalOpen] = useState(false);
    
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
                    <Divider/>
                    <div className={styled.competences_section}>
                        <Text fontWeight="bold" fontSize="xl2">Competences</Text>
                        <div className={styled.competences_content}>
                            <TableView data={data}/>
                        </div>
                    </div>
                </div>
            </main>
        </div>
    )
}

export default SubjectResults;