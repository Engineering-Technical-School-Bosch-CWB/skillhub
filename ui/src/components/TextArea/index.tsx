import styles from "./styles.module.css"

interface ITextAreaProps {
    value: string
    setValue: Function
    placeHolder?: string
    required?: boolean
    style?: any
}

export default ({ value, setValue, placeHolder, required, style }: ITextAreaProps) => {
    return (
        <>
            <textarea
                value={value}
                placeholder={placeHolder}
                onChange={(e) => setValue(e.target.value)}
                className={`${styles.textarea}`}
                style={style}
                required={required || false} />
        </>
    )
}