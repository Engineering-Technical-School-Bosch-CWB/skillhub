import { ReactNode } from "react"
import styles from "../styles.module.css"

export interface IInputContainerProps {
    label?: string
    error?: boolean
    helperText?: string
    children?: ReactNode
    id?: string
    className?: string
    disabled?: boolean
    width?: string | number
}

export default function InputContainer({
    label,
    children,
    error,
    helperText,
    id,
    className,
    disabled,
    width
}: IInputContainerProps) {

    return (
        <div
            className={`${styles.input_box} ${error ? styles.error : ""} ${className}`}
            style={{ width: width }}
        >
            {label &&
                <label
                htmlFor={id}
                className={`${styles.label} ${disabled ? styles.disabled : ""}`}
                >{label}</label>
            }

            { children }

            {helperText &&
                <span
                    className={`${styles.helper_text}`}
                >{helperText}</span>
            }
        </div>
    )
}