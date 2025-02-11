import Text from '../../../../../../typography';
import Button from '../../../../../../components/Button';
import SelectCompentece from '../SelectCompentece';
import styles from './styles.module.css';
import Divider from '@/components/Divider';

import { useState } from 'react';
import { IEvaluationPayload, IStudentSkillsProps } from '../../../../interfaces/SubjectDetails.interface';
import { EAptitude } from '@/enums/AptitudeEnum';
import internalAPI from '@/service/internal.services';
import { useNavigate, useParams } from 'react-router-dom';
import { toast } from 'react-toastify';
import toastifyUpdate from '@/constants/toastfyUpdate';

export default ({ results, setResults }: IStudentSkillsProps) => {

    const { classId, subjectId, examId } = useParams();

    const [index, setIndex] = useState(0);
    const [payload, setPayload] = useState<IEvaluationPayload[]>([]);

    const navigate = useNavigate();

    const handleChange = (studentId: number, skillId: number, aptitude?: EAptitude) => {
        setPayload(
            payload.some(p => p.studentId === studentId) ?
                payload.map(p => p.studentId !== studentId ? p : {
                    ...p,
                    results: [
                        ...p.results.filter(r => r.skillId !== skillId),
                        { skillId, aptitude }
                    ]
                }) : [...payload, { studentId, results: [{ skillId, aptitude }] }]
        );
        setResults(results.map(r => r.student.id != studentId ? r :
            {
                student: r.student,
                results: r.results.map(result => result.skillId == skillId ? {
                    ...result,
                    aptitude: aptitude
                } : result)
            }
        ))
    };

    const handleSubmit = async () => {
        const apiRequest = async () => {
            const response = await internalAPI.jsonRequest(`/skillResults/exam/${examId}`, "POST", undefined, payload);

            console.log(response)

            if (!response.success)
                throw new Error(response.message);

            return response.data;
        }

        const message = toast.loading("Saving exam evaluation...");

        apiRequest().then(content => {
            toast.update(message, {
                ...toastifyUpdate,
                render: "Exam evaluated!",
                type: "success"
            });

            console.log(content)
        }).catch(err => {
            toast.update(message, {
                ...toastifyUpdate,
                render: err.message || "Something went wrong.",
                type: "error",
            })
            console.log(err)
        })
        navigate(`/classes/${classId}/subject/${subjectId}`, { replace: true });
    }

    return (
        <>
            <section className={`${styles.align} ${styles.result_container}`}>
                <div className={`${styles.student_list_container}  ${styles.align} `}>
                    {
                        results?.map((r, i) => {
                            return (
                                <div
                                    className={`${styles.student_card} ${r.student.id == results[index].student.id ? styles.selected_student : ""}`}
                                    onClick={() => {
                                        setIndex(i)
                                    }}>
                                    <Text fontSize="sm" fontWeight={r.student.id == results[index].student.id ? "bold" : "semibold"} >{r.student.name}</Text>
                                </div>
                            );
                        })
                    }
                </div>
                <div className={`${styles.results_list_container} ${styles.align}`}>
                    {results[index].results.map((r, i) => (
                        <section
                            key={r.skillId}
                            className={`${styles.row} ${styles.align}`}
                        >
                            <div className={`${styles.content_row} ${styles.align}`}>
                                <section className={`${styles.competence_description}`}>
                                    <Text>{r.description}</Text>
                                </section>
                                <SelectCompentece
                                    value={r.aptitude}
                                    change={(value?: EAptitude) => {
                                        handleChange(results[index].student.id, r.skillId, value);
                                    }}
                                />
                                {/* <span>{r.aptitude}</span> */}
                            </div>
                            <Divider size="small" />
                        </section>
                    ))}
                </div>
            </section>
            <div className={`${styles.bttns}`}>
                <Button>Cancel</Button>
                <Button variant='contained' onClick={handleSubmit}>Save</Button>
            </div>
        </>
    )
}