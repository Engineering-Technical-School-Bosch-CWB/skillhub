import Text from '../../../../../../typography';
import Button from '../../../../../../components/Button';
import SelectCompentece from '../SelectCompentece';
import styles from './styles.module.css';
import Divider from '@/components/Divider';
import internalAPI from '@/service/internal.services';
import toastifyUpdate from '@/constants/toastfyUpdate';

import { useEffect, useRef, useState } from 'react';
import { IEvaluationPayload, IStudentSkillsProps } from '../../../../interfaces/SubjectDetails.interface';
import { EAptitude } from '@/enums/AptitudeEnum';
import { useNavigate, useParams } from 'react-router-dom';
import { toast } from 'react-toastify';

export default function StudentCompetences({ results, setResults }: IStudentSkillsProps) {
    const { classId, subjectId, examId } = useParams();

    const containerRef = useRef<HTMLDivElement>(null);
    const studentRefs = useRef<HTMLDivElement[]>([]);
    const competenceRefs = useRef<HTMLElement[][]>([]);

    const [payload, setPayload] = useState<IEvaluationPayload[]>([]);

    const [selectedStudentIndex, setSelectedStudentIndex] = useState<number>(0);
    const [selectedCompetenceIndex, setSelectedCompetenceIndex] = useState<number>(0);

    const [focusArea, setFocusArea] = useState<"student" | "competence">("student");

    const [selectOpen, setSelectOpen] = useState<boolean>(false);

    const navigate = useNavigate();

    const handleChange = (studentId: number, skillId: number, aptitude?: EAptitude) => {
        setPayload(
            payload.some(p => p.studentId === studentId)
                ? payload.map(p => p.studentId !== studentId ? p : {
                    ...p,
                    results: [
                        ...p.results.filter(r => r.skillId !== skillId),
                        { skillId, aptitude }
                    ]
                })
                : [...payload, { studentId, results: [{ skillId, aptitude }] }]
        );

        setResults(results.map(r =>
            r.student.id !== studentId
                ? r
                : {
                    student: r.student,
                    results: r.results.map(result =>
                        result.skillId === skillId
                            ? { ...result, aptitude }
                            : result
                    )
                }
        ));
    }

    const handleSubmit = async () => {

        const apiRequest = async () => {
            const response = await internalAPI.jsonRequest(
                `/skillResults/exam/${examId}`,
                "POST",
                undefined,
                payload
            );

            if (!response.success) {
                throw new Error(response.message);
            }

            return response.data;
        }

        const message = toast.loading("Saving exam evaluation...");
        apiRequest().then(() => {
            toast.update(message, {
                ...toastifyUpdate,
                render: "Exam evaluated!",
                type: "success"
            });
        }).catch(err => {
            toast.update(message, {
                ...toastifyUpdate,
                render: err.message || "Something went wrong.",
                type: "error",
            })
        }).finally(() => {
            navigate(`/classes/${classId}/subject/${subjectId}`, { replace: true });
        })
    }

    const handleDelete = async () => {
        if (!confirm("Do you really want to delete this exam?")) return;

        const response = await internalAPI.jsonRequest(`/exams/${examId}`, "DELETE");
        if (!response.success) {
            toast.error("Failed deleting exam!");
            return;
        }
        navigate(`/classes/${classId}/subject/${subjectId}`, { replace: true });
    }


    const handleKeyDown = (event: React.KeyboardEvent<HTMLDivElement>) => {
        if (selectOpen) {
            return;
        }

        switch (event.key) {
            case "ArrowLeft":
                if (focusArea === "competence") {
                    setFocusArea("student");
                }
                break;
            case "ArrowRight":
                if (focusArea === "student") {
                    setFocusArea("competence");
                }
                break;
            case "ArrowUp":
                if (focusArea === "student") {
                    setSelectedStudentIndex(prev => Math.max(0, prev - 1));
                } else {
                    setSelectedCompetenceIndex(prev => Math.max(0, prev - 1));
                }
                break;
            case "ArrowDown":
                if (focusArea === "student") {
                    setSelectedStudentIndex(prev => Math.min(prev + 1, results.length - 1));
                } else {
                    const maxComp = results[selectedStudentIndex].results.length - 1;
                    if (selectedCompetenceIndex === maxComp) {
                        if (selectedStudentIndex < results.length - 1) {
                            setSelectedStudentIndex(selectedStudentIndex + 1);
                            setSelectedCompetenceIndex(0);
                        }
                    } else {
                        setSelectedCompetenceIndex(prev => Math.min(prev + 1, maxComp));
                    }
                }
                break;
            case "Enter":
                if (focusArea === "competence") {
                    setSelectOpen(true);
                }
                break;
            default:
                if (event.ctrlKey && event.key === "Enter") {
                    handleSubmit();
                }
                break;
        }
    }

    useEffect(() => {
        if (focusArea === "student") {
            studentRefs.current[selectedStudentIndex]?.scrollIntoView({
                behavior: "smooth",
                block: "center",
            });
        } else {
            competenceRefs.current[selectedStudentIndex]?.[selectedCompetenceIndex]?.scrollIntoView({
                behavior: "smooth",
                block: "center",
            });
        }
    }, [focusArea, selectedStudentIndex, selectedCompetenceIndex]);

    useEffect(() => {
        containerRef.current?.focus(); // Foca no contêiner após a rolagem
    }, [])

    useEffect(() => {
        if(!selectOpen)
            containerRef.current?.focus(); // Foca no contêiner após a rolagem
    }, [selectOpen]);

    return (
        <>
            <section
                tabIndex={0}
                ref={containerRef}
                onKeyDown={handleKeyDown}
                autoFocus={true}
                className={`${styles.align} ${styles.result_container}`}
            >
                <div className={`${styles.student_list_container} ${styles.align}`}>
                    {results?.map((r, i) => (
                        <div
                            key={r.student.id}
                            ref={(el) => (studentRefs.current[i] = el!)}
                            className={`${styles.student_card} ${i === selectedStudentIndex ? styles.selected_student + (focusArea == "student" ? ` ${styles.selected}` : "") : ""}`}
                            onClick={() => {
                                setSelectedStudentIndex(i);
                                setFocusArea("student");
                            }}
                        >
                            <Text fontSize="sm" fontWeight={i === selectedStudentIndex ? "bold" : "semibold"} >
                                {r.student.name}
                            </Text>
                        </div>
                    ))}
                </div>

                <div className={`${styles.results_list_container} ${styles.align}`}>
                    {results[selectedStudentIndex]?.results.map((item, cIndex) => (
                        <section
                            key={item.skillId}
                            ref={(el) => {
                                if (!competenceRefs.current[selectedStudentIndex]) {
                                    competenceRefs.current[selectedStudentIndex] = [];
                                }
                                competenceRefs.current[selectedStudentIndex][cIndex] = el!;
                            }}
                            className={`${styles.row} ${styles.align}`}>
                            <div className={`${styles.content_row} ${styles.align}`}>
                                <section className={`${styles.competence_description}`}>
                                    <Text>{item.description}</Text>
                                </section>
                                <SelectCompentece
                                    selectOpened={selectOpen && selectedCompetenceIndex == cIndex}
                                    setSelectOpened={(e) => {setSelectOpen(e);setSelectedCompetenceIndex(cIndex)}}
                                    value={item.aptitude}
                                    change={(value?: EAptitude) => {
                                        handleChange(
                                            results[selectedStudentIndex].student.id,
                                            item.skillId,
                                            value
                                        );
                                    }}
                                    selected={
                                        cIndex === selectedCompetenceIndex && focusArea === "competence"
                                    }
                                />
                            </div>
                            <Divider size="small" />
                        </section>
                    ))}
                </div>
            </section>

            <div className={styles.bttns}>
                <Button kind="danger" className={styles.flex_start} onClick={handleDelete}>
                    Delete
                </Button>
                <Button onClick={() => navigate(`/classes/${classId}/subject/${subjectId}`)}>
                    Cancel
                </Button>
                <Button variant='contained' onClick={handleSubmit}>
                    Save
                </Button>
            </div>
        </>
    );
}
