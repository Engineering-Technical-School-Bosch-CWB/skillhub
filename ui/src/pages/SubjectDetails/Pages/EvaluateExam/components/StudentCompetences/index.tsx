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
        const message = toast.loading("Saving exam evaluation...");

        try {
            const response = await internalAPI.jsonRequest(
                `/skillResults/exam/${examId}`,
                "POST",
                undefined,
                payload
            );

            if (!response.success) {
                throw new Error(response.message);
            }

            toast.update(message, {
                ...toastifyUpdate,
                render: "Exam evaluated!",
                type: "success"
            });

            navigate(`/classes/${classId}/subject/${subjectId}`, { replace: true });
        } catch (err: any) {
            toast.update(message, {
                ...toastifyUpdate,
                render: err.message || "Something went wrong.",
                type: "error",
            });
            console.error(err);
        }
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

    function handleKeyDownSelect(event: React.KeyboardEvent<HTMLDivElement>) {
        switch (event.key) {
            case "ArrowDown":
                // mover para próxima opção do select, se quiser
                // setSelectCursor(selectCursor <= 2 ? selectCursor + 1 : selectCursor)
                break;
            case "ArrowUp":
                // mover para a opção anterior do select
                // setSelectCursor(selectCursor > 0 ? selectCursor - 1 : selectCursor)
                break;
            case "Enter":
                // confirma a opção do select (você pode fazer a lógica de “confirmar” aqui ou lá no SelectCompentece)
                setSelectOpen(false);
                break;
            case "Escape":
                // fecha sem mudar
                setSelectOpen(false);
                break;
            default:
                break;
        }
    }

    const handleKeyDown = (event: React.KeyboardEvent<HTMLDivElement>) => {
        // Se o select está aberto, desvia para handleKeyDownSelect
        if (selectOpen) {
            handleKeyDownSelect(event);
            return;
        }

        switch (event.key) {
            case "ArrowLeft":
                // Muda foco para a lista de alunos
                if (focusArea === "competence") {
                    setFocusArea("student");
                }
                break;
            case "ArrowRight":
                // Muda foco para a lista de competências
                if (focusArea === "student") {
                    setFocusArea("competence");
                }
                break;
            case "ArrowUp":
                if (focusArea === "student") {
                    setSelectedStudentIndex(prev => Math.max(0, prev - 1));
                } else {
                    // subindo a competência
                    setSelectedCompetenceIndex(prev => Math.max(0, prev - 1));
                }
                break;
            case "ArrowDown":
                if (focusArea === "student") {
                    setSelectedStudentIndex(prev => Math.min(prev + 1, results.length - 1));
                } else {
                    // se estiver na última competência e der ArrowDown, pula para o próximo aluno
                    const maxComp = results[selectedStudentIndex].results.length - 1;
                    if (selectedCompetenceIndex === maxComp) {
                        // só pula se não for o último aluno
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
                // Ao pressionar Enter na área de competência, abre o dropdown
                if (focusArea === "competence") {
                    setSelectOpen(true);
                }
                // Se estiver em "student", você pode decidir se quer alguma ação
                break;
            default:
                // CTRL + Enter => submeter
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
            // Foca a competência
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
                                // inicializa o array de arrays
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
                                    setSelectOpened={setSelectOpen}
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
                                // Para abrir/fechar dropdown, você pode sincronizar com setSelectOpen
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
