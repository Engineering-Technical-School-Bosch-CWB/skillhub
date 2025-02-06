import Text from "../../../../typography";
import styles from '../../styles.module.css';

import { IAvaliationTableProps } from "../../interfaces/SubjectDetails.interface";
import Icon from "../../../../components/Icon";
import { Tooltip } from "recharts";
import { useEffect } from "react";


export default ({ exam }: IAvaliationTableProps) => {

    const getSkillClass = (aptitude?: string) => {
        if (aptitude === "Skilled") return styles.SKILLED;
        if (aptitude === "Developing") return styles.DEVELOPMENT;
        if (aptitude === "Unskilled") return styles.UNSKILLED;
        return ""
    };

    const getMeanClass = (mean?: number) => {
        if (!mean) return ""

        if (mean >= 80) return styles.SKILLED;
        if (mean >= 60) return styles.DEVELOPMENT;
        return styles.UNSKILLED
    }

    return (
        <>
            <br />
            <span className={`${styles.title}`}>
                <div className={`${styles.table_header} ${styles.align}`}>
                    <span className={`${styles.subtitle}`}>
                        <Text fontSize="lg" fontWeight="bold" >{exam.name}</Text>
                        <Text fontSize="sm">{exam.date}</Text>
                    </span>
                    <span className={`${styles.subtitle} ${styles.evBtn}`}>
                        <Text fontSize="sm">Evaluate</Text>
                        <Icon name={"edit"} />
                    </span>
                </div>
                <Text fontSize="sm">{exam.description}</Text>
            </span>
            <div className={`${styles.tables}`}>
                <table className={`${styles.competence_table} ${styles.highlight_border}`}>
                    <tr>
                        <th className={`${styles.highlight_border}`}>Skill</th>
                        <th className={`${styles.highlight_border}`}>Weight</th>
                        <th className={`${styles.highlight_border} ${styles.divider}`}>Efficiency</th>
                    </tr>
                    {
                        exam.data.skills.map((s: { description: string, weight: number, efficiency: number, evaluationCriteria: string }) => (
                            <>
                                <tr>
                                    <td className={`${styles.competence_cell} ${styles.td} ${styles.skill} ${styles.tooltip}`}>
                                        <span className={`${styles.overflow}`}>{s.description}</span>
                                        <span className={`${styles.tooltiptext}`}>
                                            <Text fontWeight="bold" fontSize="sm">{s.description}</Text>
                                            <Text fontSize="sm">{s.evaluationCriteria}</Text>
                                        </span>
                                    </td>
                                    <td className={`${styles.competence_cell} ${styles.td}`}>{s.weight == null ? "-" : Number(s.weight.toFixed(2))}</td>
                                    <td className={`${styles.competence_cell} ${styles.td}`}>{s.efficiency == null ? "-" : Number(s.efficiency.toFixed(2)) + "%"}</td>
                                </tr>
                            </>
                        ))
                    }
                    <tr className={`${styles.highlight_border} ${styles.divider}`}>
                        <tr className={`${styles.performance} ${styles.skill}`}>Overall Performance</tr>
                    </tr>
                </table>

                <section className={`${styles.table_section}`}>
                    <table className={`${styles.result_table} ${styles.divider}`}>
                        <tr>
                            {
                                exam.data.students.map((s: { name: string }) => (
                                    <th className={`${styles.student_cell} ${styles.highlight_border} ${styles.divider} `}>{s.name}</th>
                                ))
                            }
                        </tr>
                        {
                            exam.data.skills.map((skill: { id: number; }) => (
                                <>
                                    <tr>
                                        {
                                            exam.data.students.map((student: { skillsResults: any[]; }) => (
                                                <>
                                                    <td className={`${styles.result_cell} ${getSkillClass(student.skillsResults[skill.id])} ${styles.td} ${styles.divider}`}>
                                                        {student.skillsResults[skill.id] || "-"}
                                                    </td>
                                                </>
                                            ))
                                        }
                                    </tr>
                                </>
                            ))
                        }
                        <tr>
                            {
                                exam.data.students.map((student: { mean: number; }) => (
                                    <td className={`${styles.result_cell} ${styles.performance_cell} ${getMeanClass(student.mean)} ${styles.highlight_border} ${styles.divider}`}>
                                        {!student.mean ? "-" : Number(student.mean.toFixed(2)) + "%"}
                                    </td>
                                ))
                            }
                        </tr>
                    </table>
                </section>
            </div>
        </>
    )
}