import { useEffect, useRef, useState } from "react"
import { EAptitude } from "../../../../../../enums/AptitudeEnum";

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

export default ({ value, change, selected, selectOpened, setSelectOpened, onClick }: ISelectCompetenceProps) => {

    const [selectCursor, setSelectCursor] = useState<number>(0);
    const [aptitudes, setAptitudes] = useState<EAptitude[]>(Object.values(EAptitude));
    const [avaliableAptitudes, setAvaliableAptitudes] = useState<EAptitude[]>([])
    const divRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        setAvaliableAptitudes(aptitudes.filter(aptitude => aptitude != value))
    }, [value, aptitudes])

    useEffect(() =>{
        if(selectOpened)
            divRef.current?.focus();
    }, [selectOpened])

    const handleChange = (aptitude?: EAptitude) => {
        change(aptitude);
        setSelectOpened(false);
    }

    function handleKeyDownSelect(event: React.KeyboardEvent<HTMLDivElement>) {
        switch (event.key) {
            case "ArrowDown":
                // mover para próxima opção do select, se quiser
                setSelectCursor(selectCursor < 2 ? selectCursor + 1 : selectCursor)
                break;
            case "ArrowUp":
                // mover para a opção anterior do select
                setSelectCursor(selectCursor > 0 ? selectCursor - 1 : selectCursor)
                break;
            case "Enter":
                // confirma a opção do select (você pode fazer a lógica de “confirmar” aqui ou lá no SelectCompentece)
                handleChange(avaliableAptitudes[selectCursor]);
                break;
            case "Escape":
                // fecha sem mudar
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
                                    <Text fontSize="sm" fontWeight="semibold">{aptitude}</Text>
                                </div>
                            )
                        )}
                        {
                            value &&
                            <div
                                className={`${styles.select_cell}  ${2 === selectCursor ? styles.selected : ""}`}
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