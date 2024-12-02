import Divider from "../../components/Divider";
import DoughnutChart from "../../components/Charts/DoughnutChart";
import Header from "../../components/Header";
import Text from "../../typography";
import styled from "./styles.module.css";

const SubjectResults = () => {
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
                                <div className={styled.chart_container}>
                                    <Text>Seu aproveitamento</Text>
                                    <DoughnutChart exploitation={60}/>
                                </div>
                                <div className={styled.chart_container}>
                                    <Text>Aproveitamento da turma</Text>
                                    <DoughnutChart exploitation={57}/>
                                </div>
                            </div>
                        </div>
                    </div>
                    <Divider/>
                    <div className={styled.competences_section}>
                        <Text>Competences</Text>
                        <div className={styled.competences_content}>

                        </div>
                    </div>
                </div>
            </main>
        </div>
    )
}

export default SubjectResults;