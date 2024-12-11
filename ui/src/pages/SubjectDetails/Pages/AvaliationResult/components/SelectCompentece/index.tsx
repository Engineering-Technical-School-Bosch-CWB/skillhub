import { useEffect, useState } from "react"
import { AptitudeEnum } from "../../../../../../enums/AptitudeEnum";

import styles from './styles.module.css';
import Text from "../../../../../../typography";

export interface ISelectCompetenceProps {
    isDefault?: AptitudeEnum | null,
    change?: (value: any) => void
}

export default ( {isDefault, change}: ISelectCompetenceProps ) => {

    const [competence, setCompetence] = useState<AptitudeEnum | null>(isDefault ?? null);

    const [selectOpened, setSelectOpened] = useState(false);

    const handleChange = (aptitude: AptitudeEnum | null) => {
        setCompetence(aptitude);
        change?.(aptitude);
        setSelectOpened(false);
    }

    const onHandleKeyPress = (event: KeyboardEvent) => {
        const pressed = event.key.toLowerCase();
        let option: AptitudeEnum | null;
        switch (pressed) {
            case '1':
                option = AptitudeEnum.APT
                break;
            case '3':
                option = AptitudeEnum.INAPT
                break;
            case '2':
                option = AptitudeEnum.DEVELOPMENT
                break;
            case 'backspace':
                option = null
                break;
            default:    
                return;
         }
        handleChange(option);
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
            {selectOpened &&
                <div className={`${styles.select_container}`}>
                    <div 
                        className={`${styles.select_cell} ${styles.APT}`} 
                        onClick={() => handleChange(AptitudeEnum.APT)} 
                        >
                        <Text>{AptitudeEnum.APT}</Text>
                        <Text fontSize="xs">(1)</Text>
                    </div>
                    <div 
                        className={`${styles.select_cell} ${styles.DEVELOPMENT}`} 
                        onClick={() => handleChange(AptitudeEnum.DEVELOPMENT)} 
                        >
                        <Text>{AptitudeEnum.DEVELOPMENT}</Text>
                        <Text fontSize="xs">(2)</Text>
                    </div>
                    <div 
                        className={`${styles.select_cell} ${styles.INAPT}`} 
                        onClick={() => handleChange(AptitudeEnum.INAPT)} 
                        >
                        <Text>{AptitudeEnum.INAPT}</Text>
                        <Text fontSize="xs">(3)</Text>
                    </div>
                </div>
            }
            <div 
                className={`${styles.selected} ${styles.select_cell} ${styles[competence ?? ""]}`} 
                onClick={() => setSelectOpened(!selectOpened)}
            >
                <Text>{competence}</Text>
            </div>
        </div>
    )
}