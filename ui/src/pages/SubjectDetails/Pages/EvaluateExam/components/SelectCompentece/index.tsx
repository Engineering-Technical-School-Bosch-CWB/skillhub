import { useEffect, useState } from "react"
import { EAptitude } from "../../../../../../enums/AptitudeEnum";

import styles from './styles.module.css';
import Text from "../../../../../../typography";

export interface ISelectCompetenceProps {
    value?: EAptitude,
    change: Function
}

export default ({ value, change }: ISelectCompetenceProps) => {

    const [skill, setSkill] = useState(value);

    const [selectOpened, setSelectOpened] = useState(false);

    const handleChange = (aptitude?: EAptitude) => {
        change(aptitude);
        setSelectOpened(false);
    }

    const onHandleKeyPress = (event: KeyboardEvent) => {
        const pressed = event.key.toLowerCase();
        let option: EAptitude | null;
        switch (pressed) {
            case '1':
                option = EAptitude.SKILLED
                break;
            case '3':
                option = EAptitude.UNSKILLED
                break;
            case '2':
                option = EAptitude.DEVELOPMENT
                break;
            case 'backspace':
                option = null
                break;
            default:
                return;
        }
        // handleChange(option);
    }

    useEffect(() => {
        if (selectOpened) {
            window.addEventListener('keydown', onHandleKeyPress)
        } else {
            window.removeEventListener('keydown', onHandleKeyPress)
        }
        return () => {
            window.removeEventListener('keydown', onHandleKeyPress)
        }
    }, [selectOpened])

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
                className={`${styles.selected} ${styles.select_cell} ${styles[value ?? ""]} ${selectOpened ? styles.selecting : ""}`}
                onClick={() => setSelectOpened(!selectOpened)}
            >
                <Text fontSize="sm" fontWeight="semibold">{value}</Text>
            </div>
        </div>
    )
}