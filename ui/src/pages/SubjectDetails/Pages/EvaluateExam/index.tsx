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


export default () => {

    const { classId, subjectId, examId } = useParams();

    const [subject, setSubject] = useState<ISubject>();
    const [exam, setExam] = useState<IExam>();

    const [studentResults, setStudentResults] = useState<IStudentResults[]>();

    const getData = async () => {
        const response = await internalAPI.jsonRequest(`/skillResults/exam/${examId}`, "GET");
        const content = response.data;

        setExam(content.exam);
        setSubject(content.subject);
        setStudentResults(content.students);
    }

    useEffect(() => {
        getData();
    }, [examId])


    return (
        <>
            <Header />
            <main>
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
                    <Text fontSize='xl2' fontWeight='bold'>{`Evaluate ${exam?.name}`}</Text>
                    <Text>{exam?.description}</Text>
                </div>
                {
                    studentResults &&
                    <StudentCompetences results={studentResults} setResults={setStudentResults} />
                }
            </main>
        </>
    )
}