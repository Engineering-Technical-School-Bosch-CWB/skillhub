import Text from "@/typography";
import { INewClass } from "../../interfaces/AddClassPage.interface"

import styles from '../../../../styles.module.css';
import overviewStyles from './styles.module.css'
import { useEffect } from "react";

interface IOverviewIndexProps {
    data: INewClass,
    setDataChecked: (value: boolean) => void
}

export default ({ data, setDataChecked } : IOverviewIndexProps) => {

    const checkClass = () : boolean => {
        const _class = data.class;
        if(!_class.abbreviation || !_class.name)
            return false
        
        return true;
    }

    const checkStudents = () : boolean => {
        if(data.students.length <= 0)
            return false;
        return true;
    }

    const checkSubjects = () : boolean => {
        return true;
    }

    const checkData = () => {
        if(!checkClass() || !checkStudents() || !checkSubjects())
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
                                    <Text fontSize="sm">- {subject.name}</Text>
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
                        <Text>{data.course.name}</Text>
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
                        <Text>{data.class.period}</Text>
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