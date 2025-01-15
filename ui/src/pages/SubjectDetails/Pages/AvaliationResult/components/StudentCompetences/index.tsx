import { useState } from 'react';
import Text from '../../../../../../typography';
import { IAvaliationTableProps } from '../../../../interfaces/SubjectDetails.interface';
import styles from './styles.module.css';
import SelectCompentece from '../SelectCompentece';
import { Student } from './interfaces/StudentCompetences.interface';
import Button from '../../../../../../components/Button';

export default ({name, data}: IAvaliationTableProps) => {
    
    const [student, setStudent] = useState<Student | null>(null)
    const [studentIndex, setStudentIndex] = useState<number| null>(null);


    const alterStudent = (e: Student | null, index: number | null) => {
        setStudent(null); 
        setTimeout(() => {
            setStudent(e);
            setStudentIndex(index);
        }, 0);
    }

    return (
        <>
            <Text fontSize='xl' fontWeight='bold'>{name}</Text>
            <section className={`${styles.align} ${styles.result_container}`}>
                <div className={`${styles.student_list_container}  ${styles.align} `}>
                    {
                        data?.students.map((_student, index) => {
                            return(
                                <div 
                                className={`${styles.student_card} ${styles.align} 
                                    ${_student == student ? styles.selected_student : ""}`} 
                                onClick={() => {
                                    alterStudent(null, null);
                                    alterStudent(_student, index)
                                }}
                                >
                                    <Text>{_student.name}</Text>
                                </div>
                            );
                        })
                    }
                </div>        
                <div className={`${styles.divider_sections}`}></div>
                {student && (
                    <div className={`${styles.results_list_container} ${styles.align}`}>
                        {student.competences.map((competence, index) => (
                            <section
                                key={`competence-${index}`}
                                className={`${styles.row} ${styles.align}`}
                            >
                                <div className={`${styles.content_row} ${styles.align}`}>
                                    <section className={`${styles.competence_description}`}>
                                        <Text>{competence.skill?.description}</Text>
                                    </section>
                                    <SelectCompentece
                                        isDefault={
                                            data?.students[studentIndex!].competences[index]
                                                ?.aptitude ?? null
                                        }
                                        change={(value) => {
                                            // Atualiza a competência no estudante selecionado
                                            const updatedStudent = { ...student };
                                            updatedStudent.competences[index].aptitude = value;
                                            setStudent(updatedStudent); // Atualiza o estado com a nova competência
                                        }}
                                    />
                                </div>
                                <div className={`${styles.divider}`}></div>
                            </section>
                        ))}
                    </div>
                )}
            </section>
            <Button variant='contained' onClick={() => {
                
            }}>Save</Button>
        </>
    )
}