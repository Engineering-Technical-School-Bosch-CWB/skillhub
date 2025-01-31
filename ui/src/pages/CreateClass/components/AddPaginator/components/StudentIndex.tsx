import Input from "@/components/Input";
import Text from "@/typography";

import styles from '../../../styles.module.css';
import { IAddStudent } from "../interfaces/AddClassPage.interface";
import Button from "@/components/Button";
import ButtonGroup from "@/components/ButtonGroup";

export interface IStudentIndexProps {
    students?: IAddStudent[],
    setStudents?: (value: IAddStudent[]) => void
}

export default ({students, setStudents}: IStudentIndexProps) => {

    const changeName = (_index: number, value: string) => {
        const student = students!;
        student[_index].name = value;
        setStudents!(student);
    }
    const changeIdentification = (_index: number, value: string) => {
        const student = students!;
        student[_index].identification = value;
        setStudents!(student);
    }

    const newStudentChanged = () => {
        const _students = students!;
        _students.push({
            name: "",
            identification: ""
        })
        if(setStudents)
            setStudents(_students);
    }

    return (
        <div className={styles.form_content}>
            <section className={styles.card_page_header}>
                <Text fontSize="lg" fontWeight="bold">Students</Text>
            </section>
            <section className={styles.card_page_content}>
                {
                    students?.map((subject, _index) => {
                        return (
                            <div className={`${styles.dual_input_zone} ${styles.divided_input_2_1}`}>
                                <Input 
                                    value={subject.name} 
                                    onChange={(e) => changeName(_index, e.target.value)} 
                                    label="Name"
                                    />
                                <Input 
                                    value={subject.identification} 
                                    onChange={(e) => changeIdentification(_index, e.target.value)} 
                                    maxLength={8}
                                    label="EDV"
                                    />
                            </div>
                        )
                    })
                }
                <div className={styles.btn_area}>
                    <Button onClick={() => newStudentChanged()}>+</Button>
                </div>
            </section>
        </div>
    )
}