import Text from "../../typography";
import getHex from "@/constants/getHex";
import Icon from "../../components/Icon";
import styles from './styles.module.css';
import Header from "../../components/Header"
import Button from "../../components/Button";
import Divider from "../../components/Divider";
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
import FeedbackModal from "./components/FeedbackModal";
import { useUserContext } from "@/contexts/user.context";
import Progress from "@/components/Progress";
import UpdateModal from "./components/UpdateModal";

interface IFeedbackModalProps {
    student?: {
        id: number
        name: string
    }
    feedback?: {
        id: number
        content: string
    }
    isFeedbackModalOpen: boolean
}

interface IUpdateModalProps {
    isUpdateModalOpen: boolean
}

const SubjectDetails = () => {

    const [loading, setLoading] = useState(true);

    const { classId, subjectId } = useParams();

    const navigate = useNavigate();

    const { user } = useUserContext();

    const [subject, setSubject] = useState<ISubject>();
    const [exams, setExams] = useState<IAvaliationTableProps[]>([]);
    const [feedbacks, setFeedbacks] = useState<IFeedback[]>([]);

    const [feedbackModalProps, setFeedbackModalProps] = useState<IFeedbackModalProps>({
        isFeedbackModalOpen: false
    });

    const [updateModalProps, setUpdateModalProps] = useState<IUpdateModalProps>({
        isUpdateModalOpen: true
    })

    const getData = async () => {

        const response = await internalAPI.jsonRequest(`/subjects/${subjectId}`, "GET");

        if (!response.success) {
            if (!toast.isActive("subject-load-error"))
                toast.error("Something went wrong.", { toastId: "subject-load-error" });
            navigate("/home");
        }

        const content = response.data;

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

        setLoading(false);
    }

    useEffect(() => {
        getData();
    }, [subjectId])

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
                    <div className={`${styles.col}`}>
                        <Text fontSize="xl2" fontWeight="bold">{subject?.curricularUnit + " - " + subject?.class}</Text>
                        <Text>
                            {
                                (!(subject?.beganAt) ? "No initial date" : "Began at " + formatDate(subject.beganAt))
                                + " | " +
                                (!(subject?.durationHours) ? "No duration hours" : "Duration: " + subject.durationHours + "h") +
                                (!(subject?.period) ? "" : " | " + subject.period + "° Period")
                            }
                        </Text>
                    </div>
                    <Button variant="primary_icon" onClick={() => setUpdateModalProps({isUpdateModalOpen: true})}><Icon name="settings" /></Button>
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
                    <section className={`${styles.col} ${styles.align}`}>
                        <Text fontSize="xl2" fontWeight="bold" >
                            Students Feedbacks
                        </Text>
                        <Text fontSize="sm" >Apprentices can see subject feedbacks!</Text>
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
                                editButton={
                                    user?.id != f.student.userId ? {
                                        label: "Edit Feedback",
                                        action: () => setFeedbackModalProps({
                                            student: {
                                                id: f.student.id,
                                                name: f.student.name
                                            },
                                            feedback: f.feedback,
                                            isFeedbackModalOpen: true
                                        })
                                    } : undefined}
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
                {
                    feedbackModalProps.student &&
                    <FeedbackModal
                        isOpen={feedbackModalProps.isFeedbackModalOpen}
                        handleIsOpen={() => setFeedbackModalProps({
                            student: undefined,
                            feedback: undefined,
                            isFeedbackModalOpen: false
                        })}
                        student={feedbackModalProps.student}
                        feedback={feedbackModalProps.feedback}
                        handleFeedbacks={{
                            feedbacks: feedbacks,
                            setFeedbacks: setFeedbacks
                        }}
                    />
                }
                {
                    subject &&
                    <UpdateModal
                        isOpen={updateModalProps.isUpdateModalOpen}
                        handleIsOpen={() => setUpdateModalProps({
                            isUpdateModalOpen: false
                        })}
                        subject={subject}
                    />
                }
            </main>
        </>

    )
}

export default SubjectDetails