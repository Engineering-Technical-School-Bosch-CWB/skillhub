import { forwardRef, useState } from "react"
import styles from "../styles.module.css"
import { IRootInputProps } from "../interfaces"
import InputContainer from "../InputContainer"
import Icon from "../../Icon"

export interface IInputPasswordProps extends IRootInputProps {
    type: "password"
}

const InputPassword = forwardRef<HTMLInputElement, IInputPasswordProps>(
    ({ error, type: initialType, label, helperText, id, className,...props }, ref) => 
{
    const [type, setType] = useState<"text" | "password">(initialType)

    return (
        <InputContainer
            label={label}
            error={error}
            helperText={helperText}
            id={id}
            className={className}
            disabled={props.disabled}
        >

            <input
                ref={ref}
                {...props}
                id={id}
                type={type}
                className={`${styles.input} ${error ? styles.error : ""}`}
                placeholder=" "
                value={props.value}
            />
            <Icon 
                name={type == "text" ? "visibility_off" : "visibility"}
                className={`${styles.input_icon}`}
                onClick={() => setType(type == "text" ? "password" : "text")}
            />
        </InputContainer>
    )
})

export default InputPassword