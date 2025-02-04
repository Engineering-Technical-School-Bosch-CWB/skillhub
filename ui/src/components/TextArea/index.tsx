import styles from "./styles.module.css"

interface ITextAreaProps {
    value: string
    setValue: Function
    placeHolder?: string
    required?: boolean
}

export default ({ value, setValue, placeHolder, required }: ITextAreaProps) => {
    return (
        <>
            <textarea
                value={value}
                placeholder={placeHolder}
                onChange={(e) => setValue(e.target.value)}
                className={`${styles.textarea}`}
                required={required || false} />
        </>
    )
}