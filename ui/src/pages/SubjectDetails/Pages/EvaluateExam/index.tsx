import Header from "../../../../components/Header"
import Text from "@/typography";
import styles from "./styles.module.css"
import { IStudentResults } from "../../interfaces/SubjectDetails.interface";
import StudentCompetences from "./components/StudentCompetences";

import SectionHeader from "@/components/SectionHeader";
import { useParams } from "react-router-dom";
import internalAPI from "@/service/internal.services";
import { useEffect, useState } from "react";
import { ISubject } from "@/interfaces/models/ISubject";
import { IExam } from "@/interfaces/models/IExam";
import Progress from "@/components/Progress";
import Button from "@/components/Button";
import Icon from "@/components/Icon";
import UpdateModal from "./components/UpdateModal";

interface IUpdateModalProps {
    isUpdateModalOpen: boolean
}

export default () => {

    const [loading, setLoading] = useState(true);

    const { classId, subjectId, examId } = useParams();

    const [subject, setSubject] = useState<ISubject>();
    const [exam, setExam] = useState<IExam>();

    const [studentResults, setStudentResults] = useState<IStudentResults[]>();

    const [updateModalProps, setUpdateModalProps] = useState<IUpdateModalProps>({
        isUpdateModalOpen: false
    })

    const getData = async () => {
        const response = await internalAPI.jsonRequest(`/exams/${examId}`, "GET");
        const content = response.data;

        setExam(content.exam);
        setSubject(content.subject);
        setStudentResults(content.students);

        setLoading(false);
    }

    useEffect(() => {
        getData();
    }, [examId])

    if (loading)
        return (
            <>
                <Header />
                <Progress />
            </>
        )


    return (
        <>
            <Header />
            <main className={styles.evaluate_main}>
                <SectionHeader links={[{
                    label: "Classes Overview",
                    goTo: "/classes"
                },
                {
                    label: subject?.class + " - " + subject?.classStartingYear,
                    goTo: `/classes/${classId}`
                },
                {
                    label: subject?.curricularUnit + " - " + subject?.class,
                    goTo: `/classes/${classId}/subject/${subjectId}`
                },
                {
                    label: exam?.name!
                }]} />
                <div className={`${styles.title_section}`}>
                    <div className={`${styles.col}`}>
                        <Text fontSize='xl2' fontWeight='bold'>{`Evaluate ${exam?.name}`}</Text>
                        <Text fontSize="sm" >{exam?.description}</Text>
                    </div>
                    <Button variant="primary_icon" onClick={() => setUpdateModalProps({
                        isUpdateModalOpen: true
                    })}><Icon name="settings" /></Button>
                </div>
                {
                    studentResults &&
                    <div className={styles.evaluate_container}>
                        <StudentCompetences results={studentResults} setResults={setStudentResults} />
                    </div>
                }
                {
                    exam &&
                    <UpdateModal
                        isOpen={updateModalProps.isUpdateModalOpen}
                        handleIsOpen={() => setUpdateModalProps({
                            isUpdateModalOpen: false
                        })}
                        exam={exam}
                        setExam={setExam}
                    />
                }
            </main>
        </>
    )
}