import Text from "../../typography";
import Icon from "../../components/Icon";
import styles from './styles.module.css';
import Header from "../../components/Header"
import Button from "../../components/Button";
import Divider from "../../components/Divider";
import TableView from "../../components/TableView";
import formatDate from "../../constants/formatDate";
import ReturnButton from "../../components/ReturnButton";
import internalAPI from "../../service/internal.services";
import AvaliationTable from "./components/AvaliationTable";

import { useEffect, useState } from "react"
import { ISubject } from "../../interfaces/models/ISubject"
import { IAvaliationTableProps, IFeedback, IFeedbackData } from "./interfaces/SubjectDetails.interface";
import { useNavigate, useParams } from "react-router-dom";
import { toast } from "react-toastify";
import SectionHeader from "@/components/SectionHeader";
import getHex from "@/constants/getHex";

const SubjectDetails = () => {

    const { classId, subjectId } = useParams();

    const navigate = useNavigate();

    const [subject, setSubject] = useState<ISubject>();
    const [exams, setExams] = useState<IAvaliationTableProps[]>([]);
    const [feedbacks, setFeedbacks] = useState<IFeedback[]>([]);

    const getData = async () => {
        const response = await internalAPI.jsonRequest(`/subjects/${subjectId}`, "GET");

        if (!response || response.statusCode != 200) {
            if (!toast.isActive("subject-load-error"))
                toast.error("Something went wrong.", { toastId: "subject-load-error" });
            navigate("/home");
        }

        const content = response.data;

        setSubject(content.subject);

        setExams(content.exams.map((e: { id: number; name: string; appliedAt: string; skills: any; students: { name: string; mean: number; skillResults: any; }[]; }) => ({
            idTest: e.id,
            name: e.name,
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
                {/* <ReturnButton /> */}
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
                            <Button className={`${styles.addBtn} ${styles.align}`} >
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
                    <Text fontSize="xl2" fontWeight="bold" >
                        Students Feedbacks
                    </Text>
                    <br />
                    {
                        feedbacks.map(f => (
                            <div className={`${styles.identificationCard}`}>
                                <div className={`${styles.space_between}`}>
                                    <section className={`${styles.align}`}>
                                        <section className={`${styles.identificationCardMarker}`} style={{ backgroundColor: getHex(f.student.name) }}></section>
                                        <section className={`${styles.cardContent}`}>
                                            <Text fontWeight="bold">{f.student.name}</Text>
                                            <Text fontWeight="semibold" fontSize="xs">
                                                {
                                                    !f.feedback
                                                    ? "No feedback provided..."
                                                    : "Last update • " + formatDate(f.feedback.updatedAt) + " by " + f.feedback.instructor
                                                }
                                            </Text>
                                        </section>
                                    </section>
                                    <section>
                                        <div className={`${styles.align}`}>
                                            <span className={`${styles.subtitle} ${styles.evBtn}`}>
                                                <Text fontSize="sm">Edit Feedback</Text>
                                                <Icon name={"edit"} />
                                            </span>
                                        </div>
                                    </section>
                                </div>
                                {
                                    f.feedback &&
                                    <Text>{f.feedback.content}</Text>
                                }
                            </div>
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