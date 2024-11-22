import { forwardRef } from "react"
import styles from "../styles.module.css"
import { IRootInputProps } from "../interfaces"

export interface IInputTextProps extends IRootInputProps {
    type: "text"
}

const InputText = forwardRef<HTMLInputElement, IInputTextProps>(
    ({ error, ...props }, ref) => {
    
    return (
        <input
            ref={ref}
            {...props}
            className={`${styles.input} ${error ? styles.error : ""}`}
            placeholder=" "
        />
    )
})

export default InputText
