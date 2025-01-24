import Text from "../../typography";
import styles from './styles.module.css'
import Ranking from "./Components/Ranking";
import getHex from "../../constants/getHex";
import Header from "../../components/Header";
import GeneralChart from "./Components/GeneralChart";
import internalAPI from "../../service/internal.services";
import SubjectBarChart from "./Components/SubjectBarChart";
import AddSubjectModal from "./Components/AddSubject.Modal";
import ContentAreaChart from "./Components/ContentAreaChart";
import DoughnutChart from "../../components/Charts/DoughnutChart";
import ExplorerContainer from "../../components/ExplorerContainer";
import Divider from "../../components/Divider";
import StudentCard from "../../components/StudentCard";

import { useParams } from "react-router-dom";
import { RankingChartProps, StudentSubject } from "./interfaces/ClassDetails.interfaces";
import { IStudentCardProps } from "../../components/StudentCard/interfaces/IStudentCard.interfaces";
import { useEffect, useState } from "react";

const ClassDetails = () => {
    const { id } = useParams<{ id: string }>();

    const [modalOpened, setModalOpened] = useState(false);

    const [className, setClassName] = useState("");
    const [subjects, setSubjects] = useState([]);
    const [search, setSearch] = useState("");
    const [students, setStudents] = useState<IStudentCardProps[]>([]);
    const [overallPerformance, setOverallPerformance] = useState(0);

    const getData = async () => {
        const response = await internalAPI.jsonRequest(`/classes/${id}?${new URLSearchParams({ query: search })}`, "GET");
        const content = response.data;

        setClassName(content.class.name + " - " + content.class.startingYear);
        setSubjects(content.subjects.map((s: { name: string; id: string; instructor: string; }) => ({
            color: getHex(s.name),
            goTo: "subject/" + s.id,
            subtitle: s.instructor,
            title: s.name,
        })));
        setStudents(content.students.map((s: { id: any; name: any; birthday: any; identification: any; }) => ({
            id: s.id,
            name: s.name,
            birthday: s.birthday,
            identification: s.identification,
            tooltip: s.identification,
            goTo: s.id
        })));
        setOverallPerformance(content.graphs.overallPerformance);

        console.log(response);
    }

    const rankingData: RankingChartProps = {
        data: students.map((e) => {
            const a: StudentSubject = {
                grade: Math.floor(Math.random() * 101),
                name: e.name!
            }
            return a;
        })
    }

    const columnChartHandle = (e: any) => {
        console.log(e);
    }

    useEffect(() => {
        getData();
    }, [id, search])

    return (
        <div>
            <AddSubjectModal isOpened={modalOpened} onClose={() => setModalOpened(false)} />
            <Header />

            <main>
                <section>
                    <ExplorerContainer data={subjects} title={className} onAddHandle={() => setModalOpened(true)} input={{
                        search: search,
                        onChange: setSearch
                    }} />
                </section>

                <Divider size="big" />

                <section className={styles.chart_container}>
                    <Text fontSize="xl2" fontWeight="bold" >Details</Text>

                    <section className={`${styles.chart_section} ${styles.align}`}>
                        <DoughnutChart exploitation={Number(overallPerformance.toFixed(1))} title="Overall Performance" />
                        <Ranking {...rankingData} />

                        <SubjectBarChart />
                        <GeneralChart />
                        <ContentAreaChart onColumnClicked={columnChartHandle} />
                    </section>
                </section>

                <Divider size="big" />

                <section className={styles.students_section}>
                    <Text fontSize="xl2" fontWeight="bold" className={`${styles.section_title}`}>
                        Students
                    </Text>

                    <div className={`${styles.student_container} ${styles.align}`} >
                        {
                            students.map(e => (
                                <StudentCard  {...e} />
                            ))
                        }
                    </div>
                    <br />
                    <br />
                    <br />
                </section>
            </main>
        </div>
    )
}

export default ClassDetails;