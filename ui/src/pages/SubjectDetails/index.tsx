import Text from "../../typography";
import getHex from "@/constants/getHex";
import Icon from "../../components/Icon";
import styles from './styles.module.css';
import Header from "../../components/Header"
import Button from "../../components/Button";
import Divider from "../../components/Divider";
import TableView from "../../components/TableView";
import formatDate from "../../constants/formatDate";
import FeedbackCard from "@/components/FeedbackCard";
import SectionHeader from "@/components/SectionHeader";
import internalAPI from "../../service/internal.services";
import AvaliationTable from "./components/AvaliationTable";

import { useEffect, useState } from "react"
import { ISubject } from "../../interfaces/models/ISubject"
import { IAvaliationTableProps, IFeedback, IFeedbackData } from "./interfaces/SubjectDetails.interface";
import { useNavigate, useParams } from "react-router-dom";
import { toast } from "react-toastify";

const SubjectDetails = () => {

    const { classId, subjectId } = useParams();

    const navigate = useNavigate();

    const [subject, setSubject] = useState<ISubject>();
    const [exams, setExams] = useState<IAvaliationTableProps[]>([]);
    const [feedbacks, setFeedbacks] = useState<IFeedback[]>([]);

    const getData = async () => {

        const response = await internalAPI.jsonRequest(`/subjects/${subjectId}`, "GET");

        if (!response.success) {
            if (!toast.isActive("subject-load-error"))
                toast.error("Something went wrong.", { toastId: "subject-load-error" });
            navigate("/home");
        }

        const content = response.data;
        console.log(content)

        setSubject(content.subject);

        setExams(content.exams.map((e: {
            description: string; id: number; name: string; appliedAt: string; skills: any; students: { name: string; mean: number; skillResults: any; }[];
        }) => ({
            idTest: e.id,
            name: e.name,
            description: e.description,
            date: !e.appliedAt ? "No informed date" : formatDate(e.appliedAt),
            data: {
                skills: e.skills,
                students: e.students.map((s: { name: string; mean: number; skillResults: any[] }) => ({
                    name: s.name,
                    mean: s.mean,
                    skillsResults: s.skillResults.reduce((acc: { [key: number]: string | null }, r: { skillId: number; aptitude: string | null }) => {
                        acc[r.skillId] = r.aptitude;
                        return acc;
                    }, {})
                }))
            }
        })))

        setFeedbacks(content.feedbacks.map(({ id, content, updatedAt, instructor, student }: IFeedbackData) => ({
            feedback: id ? { id, content, updatedAt, instructor } : null,
            student
        })));

    }

    useEffect(() => {
        getData();
    }, [subjectId])

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
                    label: subject?.curricularUnit + " - " + subject?.class
                }]} />
                <section className={`${styles.title_section} ${styles.align}`}>
                    <Text fontSize="xl2" fontWeight="bold">{subject?.curricularUnit + " - " + subject?.class}</Text>
                    <Text>
                        {
                            (!(subject?.beganAt) ? "No initial date" : "Began at " + formatDate(subject.beganAt))
                            + " | " +
                            (!(subject?.durationHours) ? "No duration hours" : "Duration: " + subject.durationHours + "h") +
                            (!(subject?.period) ? "" : " | " + subject.period + "° Period")
                        }
                    </Text>
                </section >
                <Divider size="big" />

                <section>
                    <span className={`${styles.spacing}`}>
                        <div className={`${styles.section_header}`}>
                            <Text fontSize="xl2" fontWeight="bold" >
                                Exams
                            </Text>
                            <Button className={`${styles.addBtn} ${styles.align}`} onClick={() => navigate("new-exam")} >
                                <Icon name="add" size="md" />
                            </Button>
                        </div>
                        <span>
                            {
                                exams.map((e) =>
                                    <>
                                        <AvaliationTable exam={e} />
                                        <br />
                                        <br />
                                    </>
                                )
                            }
                        </span>
                    </span>
                </section>
                <Divider size="big" />

                <section className={`${styles.spacing}`}>
                    <section className={`${styles.title_section} ${styles.align}`}>
                        <Text fontSize="xl2" fontWeight="bold" >
                            Students Feedbacks
                        </Text>
                        <Text fontSize="sm" >** Apprentices can see subject feedbacks!</Text>
                    </section>
                    {
                        feedbacks.map(f => (
                            <FeedbackCard
                                color={getHex(f.student.name)}
                                title={f.student.name}
                                subtitle={
                                    !f.feedback
                                        ? "No feedback provided..."
                                        : "Last update • " + formatDate(f.feedback.updatedAt) + " by " + f.feedback.instructor
                                }
                                editButton={{
                                    label: "Edit Feedback",
                                    action: () => { }
                                }}
                                content={f.feedback?.content}
                            />
                        ))
                    }

                </section>

                <Divider size="big" />

                <section>
                    <div className={`${styles.section_header}`}>
                        <Text fontSize="xl2" fontWeight="bold" >
                            Subject Goals
                        </Text>
                        <Button className={`${styles.addBtn} ${styles.align}`} >
                            <Icon name="add" size="md" />
                        </Button>
                    </div>
                    {/* <TableView
                        data={
                            subject.objectives!.map((e) => {
                                return {
                                    desbription: e.identification
                                }
                            })
                        }
                        hasNotation={true}
                        hasOptions={false}
                    /> */}
                </section>
            </main>
        </>

    )
}

export default SubjectDetails