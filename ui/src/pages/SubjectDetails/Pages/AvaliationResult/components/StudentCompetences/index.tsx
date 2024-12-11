import { useState } from 'react';
import Text from '../../../../../../typography';
import { IAvaliationTableProps, StudentAvaliationData } from '../../../../interfaces/SubjectDetails.interface';
import styles from './styles.module.css';
import SelectCompentece from '../SelectCompentece';


export default ({name, data}: IAvaliationTableProps) => {
    
    const [student, setStudent] = useState<StudentAvaliationData>()

    return (
        <>
            <Text fontSize='xl' fontWeight='bold'>{name}</Text>
            <section className={`${styles.align} ${styles.result_container}`}>
                <div className={`${styles.student_list_container}  ${styles.align} `}>
                    {
                        data?.students.map((e) => {
                            return(
                                <div 
                                className={`${styles.student_card} ${styles.align} ${student == e ? styles.selected_student : ""}`} 
                                onClick={() => setStudent(e)}
                                >
                                    <Text>{e.name}</Text>
                                </div>
                            );
                        })
                    }
                </div>        
                <div className={`${styles.divider_sections}`}></div>
                <div className={`${styles.results_list_container} ${styles.align}`}>
                    {
                        data?.competences.map((e) => {
                            return (
                                <section className={`${styles.row} ${styles.align}`}>
                                    <div className={`${styles.content_row} ${styles.align}`}>
                                        <section className={`${styles.competence_description}`}>
                                            <Text>{e.description}</Text>
                                        </section>
                                        <SelectCompentece />
                                    </div>
                                    <div className={`${styles.divider}`}></div>
                                </section>
                            )
                        })
                    }
                </div>
            </section>
        </>
    )
}