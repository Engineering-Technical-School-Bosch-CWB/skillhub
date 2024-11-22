import { ReactNode } from "react"
import styles from "../styles.module.css"

export interface IInputContainerProps {
    label?: string
    fullwidth?: boolean
    error?: boolean
    helperText?: string
    children?: ReactNode
    inputId: string
}

export default function InputContainer({
    label,
    children,
    error,
    fullwidth,
    helperText,
    inputId,
}:IInputContainerProps) {

    return(
        <div className={`${styles.input_box} ${fullwidth ? styles.full_width : ""} ${error ? styles.error : ""}`}>
            { children }

            {label &&
                <label
                    htmlFor={inputId}
                    className={`${styles.label}`}
                >{label}</label>
            }

            {helperText &&
                <span
                    className={`${styles.helper_text}`}
                >{helperText}</span>
            }
        </div>
    )
}