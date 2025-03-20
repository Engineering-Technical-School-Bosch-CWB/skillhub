import Header from "@/components/Header";
import Progress from "@/components/Progress";
import ExamConfig, { ISkill } from "@/components/ExamConfig";
import internalAPI from "@/service/internal.services";
import SectionHeader from "@/components/SectionHeader";
import toastifyUpdate from "@/constants/toastfyUpdate";

import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { ISubject } from "@/interfaces/models/ISubject";
import { toast } from "react-toastify";
import { Dayjs } from "dayjs";
import { ISkillSelection } from "@/components/ExamConfig/components/SkillOption";


const CreateExam = () => {

    const [loading, setLoading] = useState(true);

    const { classId, subjectId } = useParams();

    const navigate = useNavigate();

    const [subject, setSubject] = useState<ISubject>();
    const [skills, setSkills] = useState<ISkill[]>([]);
    const [teachers, setTeachers] = useState<[]>([]);

    const [examName, setExamName] = useState("");
    const [examDate, setExamDate] = useState<Dayjs>();
    const [examDescription, setExamDescription] = useState("");
    const [examInstructorId, setExamInstructorId] = useState<number>();
    const [examSkills, setExamSkills] = useState<ISkillSelection[]>([]);

    const getData = async () => {
        const response = await internalAPI.jsonRequest(`/exams/createExam/${subjectId}`, "GET");
        const content = response.data;

        setSubject(content.subject);
        setSkills(content.skills);

        setTeachers(content.teachers.map((t: { name: string; id: number; }) => ({
            key: t.name,
            value: t.id
        })))

        setExamName(content.subject.curricularUnit + " Exam");
        setExamInstructorId(content.subject.instructorId);

        setLoading(false);
    }

    const handleSubmit = async () => {
        const apiRequest = async () => {
            const response = await internalAPI.jsonRequest("/exams", "POST", undefined, {
                name: examName,
                description: examDescription,
                appliedAt: examDate?.format("YYYY-MM-DD"),
                instructorId: examInstructorId,
                subjectId: Number(subjectId),
                skills: examSkills
            });

            if (!response.success)
                throw new Error(response.message);

            return response.data;
        }

        const message = toast.loading("Creating exam...");
        apiRequest().then(() => {

            toast.update(message, {
                ...toastifyUpdate,
                render: "Exam created successfully!",
                type: "success",
            })

        }).catch(err => {
            toast.update(message, {
                ...toastifyUpdate,
                render: err.message || "Something went wrong.",
                type: "error",
            })
        }).finally(() => {
            navigate(`/classes/${classId}/subject/${subjectId}`, { replace: true });
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
                    label: "Create Exam"
                }]} />
                <ExamConfig
                    subject={subject!}
                    title={"Create exam for " + subject?.curricularUnit}
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
                    button="Create exam"
                    cancelAction={() => navigate(`/classes/${classId}/subject/${subjectId}`)} />
            </main>
        </>
    )
}

export default CreateExam;