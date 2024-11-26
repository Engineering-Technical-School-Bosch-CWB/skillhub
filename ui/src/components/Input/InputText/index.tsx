import { forwardRef } from "react"
import styles from "../styles.module.css"
import { IRootInputProps } from "../interfaces"
import InputContainer from "../InputContainer"

export interface IInputTextProps extends IRootInputProps {
    type: "text" | "email"
}

const InputText = forwardRef<HTMLInputElement, IInputTextProps>(
    ({ error, type, ...props }, ref) => 
{
    return (
        <InputContainer {...props}>
            <input
                ref={ref}
                {...props}
                type={type}
                className={`${styles.input} ${error ? styles.error : ""}`}
                placeholder=" "
            />
        </InputContainer>
    )
})

export default InputText
