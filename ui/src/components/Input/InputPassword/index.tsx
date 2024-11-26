import { forwardRef, useState } from "react"
import styles from "../styles.module.css"
import { IRootInputProps } from "../interfaces"
import InputContainer from "../InputContainer"
import Icon from "../../Icon"

export interface IInputTextProps extends IRootInputProps {
    type: "password"
}

const InputPassword = forwardRef<HTMLInputElement, IInputTextProps>(
    ({ error, type: initialType, ...props }, ref) => 
{
    const [type, setType] = useState<"text" | "password">(initialType)

    return (
        <InputContainer {...props}>
            <Icon 
                name={type == "text" ? "visibility_off" : "visibility"}
                className={`${styles.password_eye}`}
                onClick={() => setType(type == "text" ? "password" : "text")}
            />

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

export default InputPassword