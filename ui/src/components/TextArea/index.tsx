import styles from "./styles.module.css"

interface ITextAreaProps {
    value: string
    setValue: Function
    placeHolder?: string
    required?: boolean
    style?: any
    maxlength?: number
}

export default ({ value, setValue, placeHolder, required, style, maxlength }: ITextAreaProps) => {
    return (
        <>
            <textarea
                value={value}
                placeholder={placeHolder}
                onChange={(e) => setValue(e.target.value)}
                className={`${styles.textarea}`}
                style={style}
                maxLength={maxlength}
                required={required || false} />
        </>
    )
}