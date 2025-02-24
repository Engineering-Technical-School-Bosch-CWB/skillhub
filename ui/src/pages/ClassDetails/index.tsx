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

import { useNavigate, useParams } from "react-router-dom";
import { ContentAreaChartValues, IClass, IUpdateModalProps, StudentSubject } from "./interfaces/ClassDetails.interfaces";
import { IStudentCardProps } from "../../components/StudentCard/interfaces/IStudentCard.interfaces";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import SectionHeader from "@/components/SectionHeader";
import Progress from "@/components/Progress";
import Button from "@/components/Button";
import Icon from "@/components/Icon";
import UpdateProfileModal from "../UserProfile/components/UpdateProfileModal";
import UpdateModal from "./Components/UpdateModal";

const ClassDetails = () => {

    const [loading, setLoading] = useState(true);

    const { classId } = useParams();

    const navigate = useNavigate();

    const [modalOpened, setModalOpened] = useState(false);

    const [search, setSearch] = useState("");
    const [selectedSubjectId, setSelectedSubjectId] = useState<number | null>(null);
    const [selectedStudentId, setSelectedStudentId] = useState<number | null>(null);
    const [selectedSubjectAreaId, setSelectedSubjectAreaId] = useState<number | null>(null);

    const [_class, setClass] = useState<IClass>();
    const [className, setClassName] = useState("");

    const [subjects, setSubjects] = useState([]);

    const [studentsData, setStudentsData] = useState<IStudentCardProps[]>([]);
    const [overallPerformance, setOverallPerformance] = useState(0);
    const [rankingData, setRankingData] = useState<StudentSubject[]>([]);
    const [subjectsData, setSubjectsData] = useState([]);
    const [subjectAreaData, setSubjectAreaData] = useState<ContentAreaChartValues[]>([]);

    const [addStudentModal, setAddStudentModal] = useState<boolean>(false);

    const [updateModalProps, setUpdateModalProps] = useState<IUpdateModalProps>({
        isUpdateModalOpen: false
    })

    const getData = async () => {
        const params = new URLSearchParams();
        if (search) params.append('query', search);
        if (selectedSubjectId !== null) params.append('selectedCurricularUnitId', String(selectedSubjectId));
        if (selectedStudentId !== null) params.append('selectedStudentId', String(selectedStudentId));
        if (selectedSubjectAreaId !== null) params.append('selectedSubjectAreaId', String(selectedSubjectAreaId));

        const response = await internalAPI.jsonRequest(`/classes/${classId}?${params.toString()}`, "GET");

        if (!response.success) {
            if (!toast.isActive("class-load-error"))
                toast.error("Something went wrong.", { toastId: "class-load-error" });
            navigate("/home");
        }

        const content = response.data;

        setClass(content.class);
        setClassName(content.class.name + " - " + content.class.startingYear);

        setSubjects(content.subjects.map((s: { name: string; id: string; instructor: string; }) => ({
            color: getHex(s.name),
            goTo: "subject/" + s.id,
            subtitle: s.instructor,
            title: s.name,
        })));
        setStudentsData(content.students.map((s: { id: number; name: string; birthday: string; identification: string; userId: number }) => ({
            id: s.id,
            name: s.name,
            birthday: s.birthday,
            identification: s.identification,
            tooltip: s.identification,
            goTo: "/user-profile?classId=" + classId + "&userId=" + s.userId
        })));
        setOverallPerformance(content.graphs.overallPerformance ?? 0);
        setRankingData(content.graphs.studentResults.map((s: { id: number; name: string; performance: number; }) => ({
            id: s.id,
            name: s.name,
            performance: s.performance == null ? null : Number(s.performance.toFixed(2))
        })));
        setSubjectsData(content.graphs.subjectResults.map((s: { curricularUnitId: number; grade: number; name: string; }) => ({
            id: s.curricularUnitId,
            performance: s.grade == null ? 0 : Number(s.grade.toFixed(2)),
            subject: s.name
        })));
        setSubjectAreaData(content.graphs.subjectAreaResults.map((s: { id: number; grade: number; name: string; }) => ({
            id: s.id,
            performance: s.grade == null ? 0 : Number(s.grade.toFixed(2)),
            area: s.name
        })));

        setLoading(false);
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
    }, [classId, search, selectedSubjectId, selectedStudentId, selectedSubjectAreaId]);

    if (loading)
        return (
            <>
                <Header />
                <Progress />
            </>
        )

    return (
        <div onClick={clearParams}>
            <AddSubjectModal isOpen={modalOpened} onClose={() => setModalOpened(false)} classId={(+classId!)} />
            <Header />

            <main>
                <SectionHeader links={[{
                    label: "Classes Overview",
                    goTo: "/classes"
                },
                {
                    label: className
                }]} />
                <section>
                    <ExplorerContainer data={subjects} title={className} onAddHandle={() => setModalOpened(true)} input={{
                        search: search,
                        onChange: setSearch
                    }} button={{
                        icon: "settings",
                        onClick: () => setUpdateModalProps({ isUpdateModalOpen: true })
                    }} subtitle={`${_class?.abbreviation ? _class.abbreviation + " | " : ""} ${_class?.durationPeriods ? _class.durationPeriods + " periods" : "Duration periods not recorded"}`} />
                </section>

                <Divider size="big" />

                <section className={styles.chart_container}>
                    <Text fontSize="xl2" fontWeight="bold" >Details</Text>

                    <section className={`${styles.chart_section} ${styles.align}`}>
                        <div className={`${styles.line}`}>
                            <DoughnutChart exploitation={overallPerformance == null ? 0 : Number(overallPerformance.toFixed(1))} title="Overall Performance" />
                            <Ranking data={rankingData.sort((a, b) => (b.performance ?? 0) - (a.performance ?? 0))} onClick={handleStudentClick} />
                        </div>
                        <div className={`${styles.full} ${styles.flex}`}>
                            <div className={`${styles.big}`}>
                                <SubjectBarChart data={subjectsData} selectedId={selectedSubjectId} onBarClick={handleSubjectClick} />
                            </div>
                            <div className={`${styles.small}`}>
                                <ContentAreaChart data={subjectAreaData} selectedId={selectedSubjectAreaId} onBarClick={handleSubjectAreaClick} />
                            </div>
                        </div>
                        <div className={`${styles.full}`}>
                            <GeneralChart data={rankingData} selectedId={selectedStudentId} onBarClick={handleStudentClick} />
                        </div>
                    </section>
                </section>

                <Divider size="big" />

                <section className={styles.students_section}>
                    <Text fontSize="xl2" fontWeight="bold" className={`${styles.section_title}`}>
                        Students
                    </Text>

                    <div className={`${styles.student_container} ${styles.align}`} >
                        {
                            studentsData.map((e, i) => (
                                <StudentCard key={i}  {...e} />
                            ))
                        }
                    </div>
                    <br />
                    <div className={`${styles.align}`}>
                        <Button
                            variant="primary_label_icon"
                            onClick={() => setAddStudentModal(true)}
                        >
                            Add Student <Icon name="add" size="md" />
                        </Button>
                    </div>
                    <br />
                    <br />
                    <UpdateProfileModal
                        handleClose={() => setAddStudentModal(false)}
                        isCurrentUser={false}
                        open={addStudentModal}
                        title="Add New Student"
                        subtitle={className}
                        byClassId={classId}
                    />
                </section>
                {
                    _class &&
                    <UpdateModal
                        isOpen={updateModalProps.isUpdateModalOpen}
                        handleIsOpen={() => setUpdateModalProps({
                            isUpdateModalOpen: false
                        })}
                        _class={_class}
                        setClass={setClass}
                    />
                }
            </main>
        </div>
    )
}

export default ClassDetails;