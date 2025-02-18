import styles from "./style.module.css";

export default () => {
    return (
        <>
            <div className={`${styles.main}`}>
                <span className={`${styles.loading}`}>Loading...</span>
                <div className={`${styles.progress_container}`}>
                    <div className={`${styles.progress_square}`}></div>
                </div>
            </div>
        </>
    )
}