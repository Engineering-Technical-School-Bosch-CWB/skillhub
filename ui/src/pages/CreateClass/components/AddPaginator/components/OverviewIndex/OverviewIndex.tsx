import Text from "@/typography";
import { INewClass } from "../../interfaces/AddClassPage.interface"

import styles from '../../../../styles.module.css';
import overviewStyles from './styles.module.css'

interface IOverviewIndexProps {
    data: INewClass,
    setDataChecked: (value: boolean) => void
}

export default ({ data, setDataChecked } : IOverviewIndexProps) => {

    const checkClass = () : boolean => {
        return true;
    }

    const checkStudents = () : boolean => {
        return true;
    }

    const checkSubjects = () : boolean => {
        return true;
    }

    const checkData = () => {
        if(checkClass() || checkStudents() || checkSubjects())
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

                            </>
                        )
                    })
                } 
            </>
        )
    }

    return (
        <div className={`${styles.form_content} ${overviewStyles.form_content}`}>
            <section className={styles.card_page_header}>
                <Text fontSize="xl" fontWeight="bold">Overview</Text>
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
                        <Text>{data.class.periods}</Text>
                    </div>
                </section>
                
                <section className={overviewStyles.overview_section}>
                    <Text fontSize="md" fontWeight="bold">Students:</Text>
                    <div>

                    </div>
                </section>
                <section className={overviewStyles.overview_section}>
                    <Text fontSize="md" fontWeight="bold">Subjects:</Text>
                    <div>

                    </div>
                </section>
            </div>
        </div>
    )
}