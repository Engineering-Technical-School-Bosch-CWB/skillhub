import Text from "@/typography"
import styles from "../../../styles.module.css"
import { IAddSubject } from "../interfaces/AddClassPage.interface"
import SubjectSelect from "./SubjectSelect"
import { ISelectData } from "@/components/Select/interfaces"

export interface ISubjectIndex{
    subjects: IAddSubject[],
    alterSubjects: (values: IAddSubject[]) => void
}

export default ({subjects, alterSubjects}: ISubjectIndex) => {

    const handleAlterSubject = (data: ISelectData, index: number) => {
        const _selecteds = subjects;
        _selecteds[index] = {
            curricularUnitId: data.value!,
            name: data.key,
            duration: _selecteds[index].duration
        };
        alterSubjects(_selecteds);
    }

    const handleNewSubject = (data: ISelectData) => {
        const _selecteds = subjects;
        _selecteds.push({
            curricularUnitId: data.value!,
            name: data.key,
            duration: 0
        });
        alterSubjects(_selecteds);
    }

    const changeDuration = (value: string, index: number) => {
        const _selecteds = subjects;
        _selecteds[index].duration = + value;
        alterSubjects(_selecteds)
    }

    return (
        <div className={styles.form_content}>
            <section className={styles.card_page_header}>
                <Text fontSize="lg" fontWeight="bold">Subjects</Text>
                <br />
                <Text fontSize="sm">(Optional)</Text>
            </section>
            <section className={styles.card_page_content}>
            {
                subjects.map((subject, _index) => {
                    return (
                        <>
                            <SubjectSelect data={subject} onSelect={(e) => handleAlterSubject(e, _index)} onChangeInput={(e) => changeDuration(e, _index)} />
                        </>
                    )
                })
            }
            <SubjectSelect onSelect={(e) => handleNewSubject(e)} />
            </section>
        </div>
    )
}