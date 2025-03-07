import Text from "@/typography";
import { INewClass } from "../../interfaces/AddClassPage.interface"

import styles from '../../../../styles.module.css';
import overviewStyles from './styles.module.css'
import { useEffect } from "react";

interface IOverviewIndexProps {
    data: INewClass,
    setDataChecked: (value: boolean) => void
}

export default ({ data, setDataChecked }: IOverviewIndexProps) => {

    const checkClass = (): boolean => {
        const _class = data.class;
        if (!_class.startingYear || !_class.name || !data.course)
            return false

        return true;
    }

    const checkStudents = (): boolean =>
        !(data.students.length <= 0 || data.students.some(s => !s.name.trim() || !s.identification.trim()));


    const checkSubjects = (): boolean =>
        !(data.subjects.some(s => !s.curricularUnitId))

    const checkData = () => {
        if (!checkClass() || !checkStudents() || !checkSubjects())
            return false;
        setDataChecked(true);
        return true;
    }

    const renderStudents = () => {
        return (
            <>
                {
                    data.students.map((student) => {
                        return (
                            <>
                                <div>
                                    <Text fontSize="sm">- {student.identification}</Text>
                                    <Text fontSize="sm"> - {student.name}</Text>
                                </div>
                            </>
                        )
                    })
                }
            </>
        )
    }

    const renderSubjects = () => {
        return (
            <>
                {
                    data.subjects.map((subject) => {
                        return (
                            <>
                                <div>
                                    <Text fontSize="sm">- {subject.name ?? "Needs to be selected"}</Text>
                                    <Text fontSize="sm">  ({subject.duration} Hours)</Text>
                                </div>
                            </>
                        )
                    })
                }
            </>
        )
    }

    useEffect(() => {
        checkData();
    }, [])

    return (
        <div className={`${styles.form_content} ${overviewStyles.form_content}`}>
            <section className={styles.card_page_header}>
                <Text fontSize="lg" fontWeight="bold">Overview</Text>
            </section>

            <div className={overviewStyles.overview_container}>
                <section className={overviewStyles.overview_section}>
                    <Text fontSize="md" fontWeight="bold">Class:</Text>
                    <div>
                        <Text fontSize="sm">Course: </Text>
                        <Text>{data.course?.name ?? "Needs to be selected"}</Text>
                    </div>
                    <div>
                        <Text fontSize="sm">Name: </Text>
                        <Text>{data.class.name}</Text>
                    </div>
                    <div>
                        <Text fontSize="sm">Abbreviation: </Text>
                        <Text>{data.class.abbreviation}</Text>
                    </div>
                    <div>
                        <Text fontSize="sm">Periods: </Text>
                        <Text>{data.class.durationPeriods}</Text>
                    </div>
                </section>

                <section className={overviewStyles.overview_section}>
                    <Text fontSize="md" fontWeight="bold">Students:</Text>
                    <div>
                        {renderStudents()}
                    </div>
                </section>
                <section className={overviewStyles.overview_section}>
                    <Text fontSize="md" fontWeight="bold">Subjects:</Text>
                    <div>
                        {renderSubjects()}
                    </div>
                </section>
            </div>
        </div>
    )
}