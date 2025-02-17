import { useEffect, useState } from "react"
import { EAptitude } from "../../../../../../enums/AptitudeEnum";

import styles from './styles.module.css';
import Text from "../../../../../../typography";

export interface ISelectCompetenceProps {
    value?: EAptitude
    change: Function
    selected: boolean
}

export default ({ value, change, selected }: ISelectCompetenceProps) => {

    const [selectOpened, setSelectOpened] = useState(false);

    const handleChange = (aptitude?: EAptitude) => {
        change(aptitude);
        setSelectOpened(false);
    }

    return (
        <div className={`${styles.container}`}>
            {
                selectOpened &&
                <>
                    <div className={`${styles.select_container}`}>
                        {Object.values(EAptitude).map((aptitude) =>
                            aptitude !== value && (
                                <div
                                    key={aptitude}
                                    className={`${styles.select_cell} ${styles[aptitude]} ${aptitude === EAptitude.SKILLED ? styles.selected : ""}`}
                                    onClick={() => handleChange(aptitude)}
                                >
                                    <Text fontSize="sm" fontWeight="semibold">{aptitude}</Text>
                                </div>
                            )
                        )}
                        {
                            value &&
                            <div
                                className={`${styles.select_cell}`}
                                onClick={() => handleChange(undefined)}
                            >
                                <Text fontSize="sm" fontWeight="semibold" style={{ color: "var(--gray-300)" }}>{"Not evaluated"}</Text>
                            </div>
                        }
                    </div>
                    <div className={`${styles.modal_background}`} onClick={() => setSelectOpened(false)} />
                </>
            }
            <div
                className={`${styles.select_cell} ${styles[value ?? ""]} ${selectOpened ? styles.selecting : ""} ${selected ? styles.selected : ""}`}
                onClick={() => setSelectOpened(!selectOpened)}
                onKeyDown={() => setSelectOpened(!selectOpened)}
            >
                <Text fontSize="sm" fontWeight="semibold">{value}</Text>
            </div>
        </div>
    )
}