
import Header from "@/components/Header";
import Progress from "@/components/Progress";
import SectionHeader from "@/components/SectionHeader";
import internalAPI from "@/service/internal.services";

import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { ISubject } from "@/interfaces/models/ISubject";
import { ISkillSelection } from "@/components/ExamConfig/components/SkillOption";
import ExamConfig, { ISkill } from "@/components/ExamConfig";
import { Dayjs } from "dayjs";
import { toast } from "react-toastify";
import toastifyUpdate from "@/constants/toastfyUpdate";

const EditExam = () => {

    const [loading, setLoading] = useState(true);

    const { classId, subjectId, examId } = useParams();
    const navigate = useNavigate();

    const [subject, setSubject] = useState<ISubject>();

    const [skills, setSkills] = useState<ISkill[]>([]);
    const [teachers, setTeachers] = useState<[]>([]);

    const [exam, setExam] = useState("");

    const [examSkills, setExamSkills] = useState<ISkillSelection[]>([]);

    const [examName, setExamName] = useState<string>();
    const [examDate, setExamDate] = useState<Dayjs>();
    const [examDescription, setExamDescription] = useState<string>();
    const [examInstructorId, setExamInstructorId] = useState<number>();

    const getData = async () => {
        const response = await internalAPI.jsonRequest(`/exams/editExam/${examId}`, "GET");

        const content = response.data;
        const exam = content.exam;

        setExam(exam.name);

        setExamName(exam.name);
        setExamDate(exam.appliedAt);
        setExamDescription(exam.description);
        setExamInstructorId(exam.instructorId);

        setSubject(content.info.subject);
        setSkills(content.info.skills);
        setExamSkills(content.info.skills
            .filter((obj: { selected: boolean; skill: any }) => obj.selected)
            .map((obj: { skill: any }) => ({
                skillId: obj.skill.id,
                weight: obj.skill.weight
            }) as ISkillSelection)
        );

        setTeachers(content.info.teachers.map((t: { name: string; id: number; }) => ({
            key: t.name,
            value: t.id
        })))

        setLoading(false);
    }

    const handleSubmit = () => {
        const apiRequest = async () => {
            const response = await internalAPI.jsonRequest(`/exams/${examId}`, "PATCH", undefined, {
                name: examName,
                description: examDescription,
                appliedAt: examDate?.format("YYYY-MM-DD"),
                instructorId: examInstructorId,
                skills: examSkills
            });

            if (!response.success)
                throw new Error(response.message);

            return response.data;
        }

        const message = toast.loading("Updating exam...");
        apiRequest().then(() => {
            toast.update(message, {
                ...toastifyUpdate,
                render: "Exam updated successfully!",
                type: "success"
            })
        }).catch(err => {
            toast.update(message, {
                ...toastifyUpdate,
                render: err.message || "Something went wrong!",
                type: "error"
            })
        }).finally(() => {
            navigate(`/classes/${classId}/subject/${subjectId}/evaluate-exam/${examId}`);
        })
    }

    useEffect(() => {
        getData();
    }, []);

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
                    label: subject?.curricularUnit + " - " + subject?.class,
                    goTo: `/classes/${classId}/subject/${subjectId}`
                },
                {
                    label: exam,
                    goTo: `/classes/${classId}/subject/${subjectId}/evaluate-exam/${examId}`
                },
                {
                    label: "Edit exam"
                }]} />
                <ExamConfig
                    subject={subject!}
                    title={`Edit ${exam}`}
                    classId={Number(classId)}
                    subjectId={Number(subjectId)}
                    skills={skills}
                    teachers={teachers}
                    nameState={{
                        value: examName,
                        setValue: setExamName
                    }}
                    dateState={{
                        value: examDate,
                        setValue: setExamDate
                    }}
                    descriptionState={{
                        value: examDescription,
                        setValue: setExamDescription
                    }}
                    instructorState={{
                        value: examInstructorId,
                        setValue: setExamInstructorId
                    }}
                    selectedSkillsState={{
                        value: examSkills,
                        setValue: setExamSkills
                    }}
                    handleSubmit={handleSubmit}
                    button="Save exam"
                    cancelAction={() => navigate(`/classes/${classId}/subject/${subjectId}/evaluate-exam/${examId}`)} />
            </main>
        </>
    )
}

export default EditExam;