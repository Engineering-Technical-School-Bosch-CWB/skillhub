import Text from "../../../../typography";
import { IAvaliationTableProps } from "../../interfaces/SubjectDetails.interface";
import styles from '../../styles.module.css';



export default ({name, data}: IAvaliationTableProps) => {

    return (
        <>
            <br />
                <div className={`${styles.table_header}`}>
                    <Text fontSize="lg" fontWeight="bold" >
                        {name}
                    </Text>
                </div>
                <div className={`${styles.tables}`}>
                    <table  className={`${styles.competence_table }`}>
                        <tr>
                            <th>Competence</th>
                            <th>Weight</th>
                            <th>Efficacy</th>
                        </tr>
                        {
                            data.competences.map(competence => (
                                <>
                                    <tr>
                                        <td className={`${styles.competence_cell}`}>{competence.description}</td>
                                        <td className={`${styles.competence_cell}`}>{competence.weight}</td>
                                        <td className={`${styles.competence_cell}`}>{competence.efficacy}</td>
                                    </tr>
                                </>
                            ))
                        }
                    </table>

                <section className={`${styles.table_section}`}>
                    <table className={`${styles.result_table}`}>
                        <tr>
                            {
                                data.students.map(estudent => (
                                    <th>{estudent.name}</th>
                                ))
                            }
                        </tr>
                        {
                            data.competences.map(competence => (
                                <>
                                    <tr>
                                        {
                                            data.students.map(student => (
                                                <>
                                                    <td className={`${styles.result_cell} ${styles[student.competencesResult.filter(c => c.competenceId == competence.competenceId)[0].aptitude]}`}>
                                                        {student.competencesResult.filter(c => c.competenceId == competence.competenceId)[0].aptitude}
                                                    </td>
                                                </>
                                            ))
                                        }
                                    </tr>
                                </>

                            ))
                        }
                    </table>
                </section>
            </div>
        </>
    )
}