import styles from "./styles.module.css"

interface ITextAreaProps {
    value: string
    setValue: Function
    placeHolder?: string
    required?: boolean
    style?: any
    maxlength?: number,
    className?: any,
    label?: string
}

export default ({ value, label, setValue, placeHolder, required, style, maxlength, className }: ITextAreaProps) => {
    return (
        <div className={styles.text_area_container}>
            {
                label && 
                <label>{label}</label>
            }

            <textarea
                value={value}
                placeholder={placeHolder}
                onChange={(e) => setValue(e.target.value)}
                className={`${styles.textarea} ${className}`}
                style={style}
                maxLength={maxlength}
                required={required || false} />
        </div>
    )
}