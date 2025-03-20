import { useEffect } from "react";
import Text from "../../../../typography";
import { RankingChartProps, StudentSubject } from "../../interfaces/ClassDetails.interfaces"

import styles from './styles.module.css';

export default ({ data, onClick }: RankingChartProps) => {


    const getBgColor = (e: StudentSubject): string => {
        if (e.performance! >= 80) {
            return styles.green;
        } else if (e.performance! < 80 && e.performance! >= 60) {
            return styles.yellow;
        }
        return styles.red;
    }

    const CapitalizeName = (s: StudentSubject) => {
        let result = "";
        let firstName = s.name!.split(' ')[0]
        result = firstName[0].toUpperCase() + firstName.slice(1)
        result += ' ' + (s.name!.split(" ").length > 1 ? s.name!.split(' ')[1][0].toUpperCase() + "." : "")
        return result;
    }

    useEffect(() => {
        data = data.sort((e, d) => d.performance! - e.performance!)
    },[])

    return (
        <div className={`${styles.ranking_container} ${styles.align} ${styles}`}>
            {
                data.map((s, i) => {
                    return (
                        <div className={`${styles.ranking_card} ${styles.align} ${getBgColor(s)}`} onClick={(e) => {
                            e.stopPropagation();
                            onClick(s.id)
                        }} key={i} >
                            <div className={`${styles.pos}`} >
                                <Text fontWeight="bold" fontSize="sm" >{`${i + 1}°`}</Text>
                                <Text fontWeight="bold" fontSize="sm" >{CapitalizeName(s)}</Text>
                            </div>
                            <Text fontWeight="regular" fontSize="sm" >{`${s.performance == null ? "-" : s.performance + "%"}`}</Text>
                        </div>
                    )
                })
            }
        </div>
    )
}