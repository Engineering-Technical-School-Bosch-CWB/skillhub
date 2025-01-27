import Button from "../../../../components/Button";
import Link from "../../../../components/Link";
import Text from "../../../../typography"
import { IAvaliationTableProps } from "../../interfaces/SubjectDetails.interface"

import styles from '../../styles.module.css';

export default ({ name, date, idTest} : IAvaliationTableProps) => {

    return (
        <div className={`${styles.align} ${styles.new_test_shortcut_container}`}>
            <div className={`${styles.shortcut_header} ${styles.align}`}>
                <Text fontSize="lg" fontWeight="bold" >
                    {name}
                </Text>
                {
                    date &&
                    <Text fontSize="sm">
                        {date?.getDate()}/{date?.getMonth()}/{date?.getFullYear()}
                    </Text>                    
                }
            </div>

            <Link to={`/class/subject/test/result/${idTest}`}>
                <Button variant="contained">Avaliar</Button>
            </Link>
        </div>
    )
}