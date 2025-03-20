import { useEffect, useRef, useState } from "react"
import { EAptitude } from "../../../../../../enums/AptitudeEnum";
import { t } from 'i18next';

import styles from './styles.module.css';
import Text from "../../../../../../typography";

export interface ISelectCompetenceProps {
    value?: EAptitude
    change: Function
    selected: boolean
    selectOpened: boolean 
    setSelectOpened: (value: boolean) => void,
    onClick?: () => void,
}

export default ({ value, change, selected, selectOpened, setSelectOpened }: ISelectCompetenceProps) => {

    const [selectCursor, setSelectCursor] = useState<number>(0);
    const [aptitudes] = useState<EAptitude[]>(Object.values(EAptitude));
    const [avaliableAptitudes, setAvaliableAptitudes] = useState<EAptitude[]>([])
    const divRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        setAvaliableAptitudes(aptitudes)
    }, [value, aptitudes])

    useEffect(() =>{
        if(selectOpened){}
            divRef.current?.focus();
    }, [selectOpened])

    const handleChange = (aptitude?: EAptitude) => {
        change(aptitude);
        setSelectOpened(false);
        setSelectCursor(0);
    }

    function handleKeyDownSelect(event: React.KeyboardEvent<HTMLDivElement>) {
        switch (event.key) {
            case "ArrowDown":
                setSelectCursor(selectCursor < 3 ? selectCursor + 1 : selectCursor)
                break;
            case "ArrowUp":
                setSelectCursor(selectCursor > 0 ? selectCursor - 1 : selectCursor)
                break;
            case "Enter":
                handleChange(avaliableAptitudes[selectCursor]);
                break;
            case "Escape":
                setSelectOpened(false);
                break;
            default:
                break;
        }
    }
    return (
        <div className={`${styles.container}`}>
            {
                selectOpened &&
                <>
                    <div 
                        ref={divRef}
                        tabIndex={0}
                        className={`${styles.select_container}`}
                        onKeyDown={(key) => handleKeyDownSelect(key)}
                    >
                        {avaliableAptitudes.map((aptitude, index) =>
                            (
                                <div
                                    key={aptitude}
                                    className={`${styles.select_cell} ${styles[aptitude]} ${index === selectCursor ? styles.selected : ""}`}
                                    onClick={() => handleChange(aptitude)}
                                >
                                    <Text fontSize="sm" fontWeight="semibold">{t(`subjectDetails.selectCompetence.${aptitude}`)}</Text>
                                </div>
                            )
                        )}
                        {
                            <div
                                className={`${styles.select_cell}  ${3 === selectCursor ? styles.selected : ""}`}
                                onClick={() => handleChange(undefined)}
                            >
                                <Text fontSize="sm" fontWeight="semibold" style={{ color: "var(--gray-300)" }}>{t('subjectDetails.selectCompetence.NotEvaluated')}</Text>
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
                <Text fontSize="sm" fontWeight="semibold">
                    {value ? t(`subjectDetails.selectCompetence.${value}`) : value}
                </Text>
            </div>
        </div>
    )
}