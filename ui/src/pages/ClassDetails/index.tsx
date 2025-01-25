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
import { ContentAreaChartValues, StudentSubject } from "./interfaces/ClassDetails.interfaces";
import { IStudentCardProps } from "../../components/StudentCard/interfaces/IStudentCard.interfaces";
import { useEffect, useState } from "react";

const ClassDetails = () => {
    const { id } = useParams<{ id: string }>();

    const [modalOpened, setModalOpened] = useState(false);

    const [search, setSearch] = useState("");
    const [selectedSubjectId, setSelectedSubjectId] = useState<number | null>(null);
    const [selectedStudentId, setSelectedStudentId] = useState<number | null>(null);
    const [selectedSubjectAreaId, setSelectedSubjectAreaId] = useState<number | null>(null);

    const [className, setClassName] = useState("");
    const [subjects, setSubjects] = useState([]);

    const [studentsData, setStudentsData] = useState<IStudentCardProps[]>([]);
    const [overallPerformance, setOverallPerformance] = useState(0);
    const [rankingData, setRankingData] = useState<StudentSubject[]>([]);
    const [subjectsData, setSubjectsData] = useState([]);
    const [subjectAreaData, setSubjectAreaData] = useState<ContentAreaChartValues[]>([]);

    const getData = async () => {
        const params = new URLSearchParams();
        if (search) params.append('query', search);
        if (selectedSubjectId !== null) params.append('selectedCurricularUnitId', String(selectedSubjectId));
        if (selectedStudentId !== null) params.append('selectedStudentId', String(selectedStudentId));
        if (selectedSubjectAreaId !== null) params.append('selectedSubjectAreaId', String(selectedSubjectAreaId));

        const response = await internalAPI.jsonRequest(`/classes/${id}?${params.toString()}`, "GET");
        const content = response.data;

        console.log(content)

        setClassName(content.class.name + " - " + content.class.startingYear);
        setSubjects(content.subjects.map((s: { name: string; id: string; instructor: string; }) => ({
            color: getHex(s.name),
            goTo: "subject/" + s.id,
            subtitle: s.instructor,
            title: s.name,
        })));
        setStudentsData(content.students.map((s: { id: any; name: any; birthday: any; identification: any; }) => ({
            id: s.id,
            name: s.name,
            birthday: s.birthday,
            identification: s.identification,
            tooltip: s.identification,
            goTo: s.id
        })));
        setOverallPerformance(content.graphs.overallPerformance ?? 0);
        setRankingData(content.graphs.studentResults.map((s: { id: number; name: string; performance: number; }) => ({
            id: s.id,
            name: s.name,
            performance: !s.performance ? 0 : Number(s.performance.toFixed(2))
        })));
        setSubjectsData(content.graphs.subjectResults.map((s: { curricularUnitId: number; performance: number; name: string; }) => ({
            id: s.curricularUnitId,
            performance: !s.performance ? 0 : Number(s.performance.toFixed(2)),
            subject: s.name
        })));
        setSubjectAreaData(content.graphs.subjectAreaResults.map((s: { id: number; performance: number; name: string; }) => ({
            id: s.id,
            performance: !s.performance ? 0 : Number(s.performance.toFixed(2)),
            area: s.name
        })))

        console.log(response);
    }

    const handleSubjectClick = (id: number | null) => {
        clearParams();
        if (selectedSubjectId != id) setSelectedSubjectId(id);
    }

    const handleStudentClick = (id: number | null) => {
        clearParams();
        if (selectedStudentId != id) setSelectedStudentId(id);
    }

    const handleSubjectAreaClick = (id: number | null) => {
        clearParams();
        if (selectedSubjectAreaId != id) setSelectedSubjectAreaId(id);
    }

    const clearParams = () => {
        setSelectedSubjectId(null);
        setSelectedStudentId(null);
        setSelectedSubjectAreaId(null);
    }

    useEffect(() => {
        getData();
    }, [id, search, selectedSubjectId, selectedStudentId, selectedSubjectAreaId])

    return (
        <div onClick={clearParams}>
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
                        <Ranking data={rankingData} onClick={handleStudentClick} />

                        <SubjectBarChart data={subjectsData} selectedId={selectedSubjectId} onBarClick={handleSubjectClick} />
                        <GeneralChart data={rankingData} selectedId={selectedStudentId} onBarClick={handleStudentClick} />
                        <ContentAreaChart data={subjectAreaData} selectedId={selectedSubjectAreaId} onBarClick={handleSubjectAreaClick} />
                    </section>
                </section>

                <Divider size="big" />

                <section className={styles.students_section}>
                    <Text fontSize="xl2" fontWeight="bold" className={`${styles.section_title}`}>
                        Students
                    </Text>

                    <div className={`${styles.student_container} ${styles.align}`} >
                        {
                            studentsData.map(e => (
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