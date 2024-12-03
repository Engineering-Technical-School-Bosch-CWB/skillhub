import Text from "../../../../typography";
import { RankingChartProps, StudentSubject } from "../../interfaces/ClassDetails.interfaces"

import styles from './styles.module.css';

export default ({data}: RankingChartProps) => {

    data = data.sort((e, d) => d.grade! - e.grade!)

    const getBgColor  = (e: StudentSubject) : string=> {
        if(e.grade! >= 80) {
            return styles.green;
        } else if (e.grade! < 80 && e.grade! >= 60) {
            return styles.yellow;
        } 
        return styles.red;
    }

    return (
        <div className={`${styles.ranking_container} ${styles.align} ${styles}`}>
            {
                data.map((e) => {
                    const name = e.name!.split(' ')[0] + ' ' + e.name!.split(' ')[1][0].toUpperCase() + "."
                    return (
                        <>
                            <div className={`${styles.ranking_card} ${styles.align} ${getBgColor(e)}`}>
                                <Text fontWeight="bold" >{name}</Text>
                                <Text fontWeight="regular" >{e.grade}%</Text>
                            </div>
                        </>
                    )
                })
            }
        </div>
    )
}