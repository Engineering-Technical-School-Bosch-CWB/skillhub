import { forwardRef } from "react"
import styles from "../styles.module.css"
import { IRootInputProps } from "../interfaces"
import InputContainer from "../InputContainer"

export interface IInputTextProps extends IRootInputProps {
    type: "text" | "email"
}

const InputText = forwardRef<HTMLInputElement, IInputTextProps>(
    ({ error, type, label, helperText, id, ...props }, ref) => 
{
    return (
        <InputContainer
            label={label}
            error={error}
            helperText={helperText}
            id={id}
        >
            <input
                ref={ref}
                {...props}
                id={id}
                type={type}
                className={`${styles.input} ${error ? styles.error : ""}`}
                placeholder=" "
            />
        </InputContainer>
    )
})

export default InputText
