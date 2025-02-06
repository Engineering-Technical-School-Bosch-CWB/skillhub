import Text from "@/typography";
import Input from "@/components/Input";
import Select from "@/components/Select";
import Header from "@/components/Header";
import styles from "./styles.module.css";
import TextArea from "@/components/TextArea";
import internalAPI from "@/service/internal.services";
import SectionHeader from "@/components/SectionHeader";

import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { ISubject } from "@/interfaces/models/ISubject";
import SkillOption, { ISkillSelection } from "./components/SkillOption";
import Button from "@/components/Button";
import { toast } from "react-toastify";
import toastifyUpdate from "@/constants/toastfyUpdate";
import { Dayjs } from "dayjs";

interface ISkill {
    id: number
    curricularUnitId: number
    description: string
    evaluationCriteria: string | null
}

const CreateExam = () => {

    const { classId, subjectId } = useParams();

    const navigate = useNavigate();

    const [subject, setSubject] = useState<ISubject>();
    const [skills, setSkills] = useState<ISkill[]>([]);
    const [teachers, setTeachers] = useState([]);

    const [examName, setExamName] = useState("");
    const [examDate, setExamDate] = useState<Dayjs | null>();
    const [examDescription, setExamDescription] = useState("");
    const [examInstructorId, setExamInstructorId] = useState<number>();
    const [examSkills, setExamSkills] = useState<ISkillSelection[]>([]);

    const getData = async () => {
        const response = await internalAPI.jsonRequest(`/skills/createExam/${subjectId}`, "GET");
        const content = response.data;

        setSubject(content.subject);
        setSkills(content.skills);
        setTeachers(content.teachers.map((t: { name: string; id: number; }) => ({
            key: t.name,
            value: t.id
        })))

        setExamName(content.subject.curricularUnit + " Exam");
        setExamInstructorId(content.subject.instructorId);
        console.log(content);
    }

    const handleSubmit = async () => {
        const apiRequest = async () => {
            const response = await internalAPI.jsonRequest("/exams", "POST", undefined, {
                name: examName,
                description: examDescription,
                apliedAt: examDate?.format("YYYY-MM-DD"),
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
        })

        navigate(`/classes/${classId}/subject/${subjectId}`, { replace: true });

    }

    useEffect(() => {
        getData();
    }, []);

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
                <Text fontSize="xl2" fontWeight="bold">{"Create exam for " + subject?.curricularUnit}</Text>
                <div className={`${styles.section}`}>
                    <div className={`${styles.form}`}>
                        <div className={`${styles.justify}`}>
                            <Input
                                className={`${styles.input}`}
                                label="Exam name"
                                value={examName}
                                onChange={(e) => {
                                    setExamName(e.target.value);
                                }}
                                maxLength={50}
                                required />
                            <Input
                                type="date"
                                dateChange={(e) => {
                                    setExamDate(e)
                                }}
                            />
                        </div>
                        <TextArea placeHolder="Description" style={{ height: "120px" }} value={examDescription} setValue={setExamDescription} maxlength={255} />
                        <Select
                            data={teachers}
                            onChange={(e) => {
                                setExamInstructorId(Number(e.target.value));
                            }}
                            label="Select an instructor"
                            hasDefault={subject?.instructorId != null}
                        />
                        <Text fontWeight="bold">Select the exam skills</Text>
                        <div className={`${styles.skills}`}>
                            {
                                skills.map(s => (
                                    <SkillOption key={s.id} id={s.id} description={s.description} selectedSkills={examSkills} setSelectedSkills={setExamSkills} />
                                ))
                            }

                        </div>
                        <div className={`${styles.bttns}`}>
                            <Button onClick={() => navigate(`/classes/${classId}/subject/${subjectId}`)}>Cancel</Button>
                            <Button variant="contained" onClick={handleSubmit} >Create Exam</Button>
                        </div>
                    </div>
                </div>
            </main>
        </>
    )
}

export default CreateExam;