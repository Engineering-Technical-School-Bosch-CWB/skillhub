import { useEffect, useState } from "react"
import { AptitudeEnum } from "../../../../../../enums/AptitudeEnum";

import styles from './styles.module.css';
import Text from "../../../../../../typography";

export default () => {
    const [competence, setCompetence] = useState<AptitudeEnum>();

    const [selectOpened, setSelectOpened] = useState(false);

    const change = (aptitude: AptitudeEnum) => {
        setCompetence(aptitude);
        setSelectOpened(false);
        onChange();
    }

    const onHandleKeyPress = (event: KeyboardEvent) => {
        const pressed = event.key.toLowerCase();
        let option: AptitudeEnum;
        switch (pressed) {
            case 'a':
                option = AptitudeEnum.APT
                break;
            case 'i':
                option = AptitudeEnum.INAPT
                break;
            case 'd':
                option = AptitudeEnum.DEVELOPMENT
                break;
            default:
                break;
        }
        change(option!);
    }

    const onChange = () : AptitudeEnum => {
        return competence!
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
                        onClick={() => change(AptitudeEnum.APT)} 
                        >
                        <Text>{AptitudeEnum.APT}</Text>
                        <Text fontSize="xs">(a)</Text>
                    </div>
                    <div 
                        className={`${styles.select_cell} ${styles.INAPT}`} 
                        onClick={() => change(AptitudeEnum.INAPT)} 
                        >
                        <Text>{AptitudeEnum.INAPT}</Text>
                        <Text fontSize="xs">(i)</Text>
                    </div>
                    <div 
                        className={`${styles.select_cell} ${styles.DEVELOPMENT}`} 
                        onClick={() => change(AptitudeEnum.DEVELOPMENT)} 
                        >
                        <Text>{AptitudeEnum.DEVELOPMENT}</Text>
                        <Text fontSize="xs">(d)</Text>
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