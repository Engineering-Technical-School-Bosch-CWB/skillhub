import styles from "./styles.module.css"

interface ITextAreaProps {
    value: string
    setValue: Function
    placeHolder?: string
}

export default ({ value, setValue, placeHolder }: ITextAreaProps) => {
    return (
        <>
            <textarea
                value={value}
                placeholder={placeHolder}
                onChange={(e) => setValue(e.target.value)}
                className={`${styles.textarea}`} />
        </>
    )
}