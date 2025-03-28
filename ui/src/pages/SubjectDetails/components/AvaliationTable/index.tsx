import Text from "../../../../typography";
import styles from '../../styles.module.css';

import { IAvaliationTableProps } from "../../interfaces/SubjectDetails.interface";
import Icon from "../../../../components/Icon";
import { Link, useNavigate, useParams } from "react-router-dom";
import { t } from 'i18next';

export default ({ exam }: IAvaliationTableProps) => {

    const navigate = useNavigate();

    const { classId, subjectId } = useParams();

    const getSkillClass = (aptitude?: string) => {
        if (aptitude === "Skilled") return styles.SKILLED;
        if (aptitude === "Developing") return styles.DEVELOPMENT;
        if (aptitude === "Unskilled") return styles.UNSKILLED;
        return ""
    };
    
    const getMeanClass = (mean?: number) => {
        if (mean == null) return ""

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
                        <Text fontSize="sm" fontWeight="semibold">{exam.date}</Text>
                    </span>
                    <span
                    className={`${styles.subtitle} ${styles.evBtn}`}
                    onClick={() => navigate(`/classes/${classId}/subject/${subjectId}/evaluate-exam/${exam.idTest}`)}>
                        <Text fontSize="sm">{t('subjectDetails.avaliationTable.evaluate')}</Text>
                        <Icon name={"edit"} />
                    </span>
                </div>
                <Text fontSize="sm">{exam.description}</Text>
            </span>
            <div className={`${styles.tables}`}>
                <table className={`${styles.competence_table} ${styles.highlight_border}`}>
                    <tr>
                        <th className={`${styles.highlight_border}`}>{t('subjectDetails.avaliationTable.skill')}</th>
                        <th className={`${styles.highlight_border}`}>{t('subjectDetails.avaliationTable.weight')}</th>
                        <th className={`${styles.highlight_border} ${styles.divider}`}>{t('subjectDetails.avaliationTable.efficiency')}</th>
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
                        <tr className={`${styles.performance} ${styles.skill}`}>{t('subjectDetails.avaliationTable.overallPerformance')}</tr>
                    </tr>
                </table>

                <section className={`${styles.table_section}`}>
                    <table className={`${styles.result_table} ${styles.divider}`}>
                        <tr>
                            {
                                exam.data.students.map((s: { name: string; id:number; userId: number }) => (
                                    <th className={`${styles.student_cell} ${styles.highlight_border} ${styles.divider}`}>
                                        <Link to={`/user-profile?classId=${exam.classId}&userId=${s.userId}`}>
                                            {s.name}
                                        </Link>
                                    </th>
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
                                                        {student.skillsResults[skill.id] 
                                                            ? t(`subjectDetails.avaliationTable.${student.skillsResults[skill.id]}`) 
                                                            : "-"}
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
                                        {student.mean == null ? "-" : Number(student.mean.toFixed(2)) + "%"}
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