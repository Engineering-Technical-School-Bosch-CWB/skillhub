import Input from "../Input";
import Select from "../Select";
import Button from "../Button";
import Text from "@/typography";
import TextArea from "../TextArea";
import styles from "./styles.module.css"

import { Dayjs } from "dayjs";
import { ISubject } from "@/interfaces/models/ISubject";
import SkillOption, { ISkillSelection } from "./components/SkillOption";
import { IState } from "@/interfaces/IState.interface";
import { t } from "i18next";

export interface ISkill {
    selected: boolean
    skill: {
        id: number
        weight?: number
        curricularUnitId: number
        description: string
        evaluationCriteria: string | null
    }
}

interface IExamConfigProps {
    subject: ISubject
    title: string

    classId: number
    subjectId: number

    skills: ISkill[]
    teachers: []

    nameState: IState<string | undefined>
    dateState: IState<Dayjs | undefined>
    descriptionState: IState<string | undefined>
    instructorState: IState<number | undefined>
    selectedSkillsState: IState<ISkillSelection[]>

    handleSubmit: Function
    button: string
    cancelAction: Function
}

export default ({ subject, title, skills, teachers, nameState, dateState, descriptionState, instructorState, selectedSkillsState, handleSubmit, button, cancelAction }: IExamConfigProps) => {

    return (
        <>
            <Text fontSize="xl2" fontWeight="bold">{title}</Text>
            <div className={`${styles.section}`}>
                <div className={`${styles.form}`}>
                    <div className={`${styles.justify}`}>
                        <Input
                            className={`${styles.input}`}
                            label={t('createExam.examName')}
                            value={nameState.value}
                            onChange={(e) => {
                                nameState.setValue(e.target.value);
                            }}
                            maxLength={50}
                            required />
                        <Input
                            type="date"
                            dateChange={(e) => {
                                dateState.setValue(e)
                            }}
                            label={t('createExam.date')}
                            value={dateState.value?.toString()}
                        />
                    </div>
                    <TextArea placeHolder={t('createExam.description')} style={{ height: "120px" }} value={descriptionState.value} setValue={descriptionState.setValue} maxlength={255} />
                    <Select
                        data={teachers}
                        onChange={(e) => {
                            instructorState.setValue(Number(e.target.value));
                        }}
                        label={t('createExam.selectInstructor')}
                        hasDefault={subject?.instructorId != null}
                    />
                    <Text fontWeight="bold">{t('createExam.selectExamSkills')}</Text>
                    <div className={`${styles.skills}`}>
                        {
                            skills.map(s => (
                                <SkillOption selected={s.selected} key={s.skill.id} id={s.skill.id} skillWeight={s.skill.weight} description={s.skill.description} selectedSkills={selectedSkillsState.value} setSelectedSkills={selectedSkillsState.setValue} />
                            ))
                        }
                    </div>
                    <div className={`${styles.bttns}`}>
                        <Button onClick={() => cancelAction()}>{t('buttons.cancel')}</Button>
                        <Button variant="contained" onClick={() => handleSubmit()} >{button}</Button>
                    </div>
                </div>
            </div>
        </>
    )
}