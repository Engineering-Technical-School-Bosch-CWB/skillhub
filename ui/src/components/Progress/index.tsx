import styles from "./style.module.css";
import { t } from 'i18next';

interface IProgressProps {
    component?: boolean
}

const Progress = () => {
    return (
        <>
        <div className={`${styles.col}`}>
            <span className={`${styles.loading}`}>{t('components.progress')}</span>
            <div className={`${styles.progress_container}`}>
                <div className={`${styles.progress_square}`}></div>
            </div>
        </div>
        </>
    )
}

export default ({ component }: IProgressProps) => {

    if (component)
        return <Progress />

    return (
        <>
            <div className={`${styles.main}`}>
                <Progress />
            </div>
        </>
    )
}