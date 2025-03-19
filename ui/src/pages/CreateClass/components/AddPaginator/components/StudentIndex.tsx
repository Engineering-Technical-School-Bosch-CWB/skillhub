import Input from "@/components/Input";
import Text from "@/typography";

import styles from '../../../styles.module.css';
import { IAddStudent } from "../interfaces/AddClassPage.interface";
import Button from "@/components/Button";
import Icon from "@/components/Icon";
import { toast } from "react-toastify";
import { t } from "i18next";

export interface IStudentIndexProps {
    students?: IAddStudent[],
    setStudents?: (value: IAddStudent[]) => void
}

export default ({ students, setStudents }: IStudentIndexProps) => {
    const changeName = (_index: number, value: string) => {
        const student = [...students!];
        student[_index].name = value;
        setStudents!(student);
    }

    const changeIdentification = (_index: number, value: string) => {
        const student = [...students!];
        student[_index].identification = value;
        setStudents!(student);
    }

    const removeStudent = (index: number) => {
        if (students && setStudents) {
            const _students = students.filter((_, i) => i !== index);
            setStudents(_students);
        }
    }

    const newStudentChanged = () => {
        if (students?.some(s => !s.name.trim() || !s.identification.trim())) 
            return toast.error(t('createClass.errors.fillAllFields'), {toastId: "fillAllFields"});

        const _students = [...students!, { name: "", identification: "" }];
        setStudents!(_students);
    }

    return (
        <div className={styles.form_content}>
            <section className={styles.card_page_header}>
                <Text fontSize="lg" fontWeight="bold">{t('createClass.tabIndex.students')}</Text>
            </section>
            <section className={styles.card_page_content}>
                {
                    students?.map((subject, _index) => (
                        <div key={_index} className={`${styles.dual_input_zone} ${styles.divided_input_1_3}`}>
                            <Input 
                                value={subject.identification} 
                                onChange={(e) => changeIdentification(_index, e.target.value)} 
                                maxLength={8}
                                label="EDV"
                            />
                            <Input 
                                value={subject.name} 
                                onChange={(e) => changeName(_index, e.target.value)} 
                                label={t('createClass.studentIndex.name')}
                                maxLength={500}
                            />
                            <Button variant="rounded" kind="danger" onClick={() => removeStudent(_index)}>
                                <Icon name="close"/>
                            </Button>
                        </div>
                    ))
                }
                <div className={styles.btn_area}>
                    <Button onClick={newStudentChanged}>+</Button>
                </div>
            </section>
        </div>
    )
}
