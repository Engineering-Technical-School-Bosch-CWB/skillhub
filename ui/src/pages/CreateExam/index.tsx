import Text from "@/typography";
import Input from "@/components/Input";
import Header from "@/components/Header";
import styles from "./styles.module.css";
import TextArea from "@/components/TextArea";
import internalAPI from "@/service/internal.services";
import SectionHeader from "@/components/SectionHeader";

import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { ISubject } from "@/interfaces/models/ISubject";
import CheckBoxContainer from "@/components/Input/CheckBoxContainer";
import InputCheckBox from "@/components/Input/InputCheckBox";
import SkillOption, { ISkillSelection } from "./components/SkillOption";

interface ISkill {
    id: number
    curricularUnitId: number
    description: string
    evaluationCriteria: string | null
}

const CreateExam = () => {

    const { classId, subjectId } = useParams();

    const [subject, setSubject] = useState<ISubject>();
    const [skills, setSkills] = useState<ISkill[]>([]);

    const [examName, setExamName] = useState("");
    const [examDate, setExamDate] = useState();
    const [examDescription, setExamDescription] = useState("");
    const [examSkills, setExamSkills] = useState<ISkillSelection[]>([]);

    const getData = async () => {
        const response = await internalAPI.jsonRequest(`/skills/createExam/${subjectId}`, "GET");
        const content = response.data;

        setSubject(content.subject);
        setSkills(content.skills);
        console.log(content);
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
                    goTo: `/classes/${classId}/subject/${subject?.id}`
                },
                {
                    label: "Create Exam"
                }]} />
                <Text fontSize="xl2" fontWeight="bold">{"Create exam for " + subject?.curricularUnit}</Text>
                <div className={`${styles.section}`}>
                    <form className={`${styles.form}`}>
                        <div className={`${styles.justify}`}>
                            <Input className={`${styles.input}`} label="Exam name" required />
                            <Input type="date" />
                        </div>
                        <TextArea placeHolder="Description" style={{ height: "150px" }} required={true} value={examDescription} setValue={setExamDescription} />
                        <Text fontWeight="bold">Select the exam skills</Text>
                        <div className={`${styles.skills}`}>
                            {
                                skills.map(s => (
                                    <SkillOption key={s.id} id={s.id} description={s.description} selectedSkills={examSkills} setSelectedSkills={setExamSkills} />
                                ))
                            }

                        </div>
                    </form>
                </div>

            </main>
        </>
    )
}

export default CreateExam;