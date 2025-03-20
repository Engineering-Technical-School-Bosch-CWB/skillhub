import { ReactNode } from "react"

import styles from './styles.module.css'

export interface ICheckBoxContainerProps {
    label: string
    error?: boolean
    helperText?: string
    children?: ReactNode
    id?: string
    className?: string
    width?: string | number
}

export default ({
    label,
    error,
    helperText,
    children,
    id,
    className,
    width
}: ICheckBoxContainerProps) => {
    return (
        <div className={`${styles.checkbox_container} ${error ? styles.error : ""} ${styles[className ?? ""]}`} style={{ width: width || "100%" }} >

            {children}
            {
                label &&
                <label
                    htmlFor={id}
                    className={`${styles.label}`}
                >
                    {label}
                </label>
            }

            {
                helperText &&
                <span
                    className={`${styles.helper_text}`}
                >{helperText}</span>
            }
        </div>
    )
}