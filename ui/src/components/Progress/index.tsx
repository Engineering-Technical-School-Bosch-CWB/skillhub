import styles from "./style.module.css";

interface IProgressProps {
    component?: boolean
}

const Progress = () => {
    return (
        <>
        <div className={`${styles.col}`}>
            <span className={`${styles.loading}`}>Loading...</span>
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