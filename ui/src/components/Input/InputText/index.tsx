import Icon from "../../Icon"
import styles from "../styles.module.css"
import InputContainer from "../InputContainer"

import { forwardRef } from "react"
import { IRootInputProps } from "../interfaces"

export interface IInputTextProps extends IRootInputProps {
    type?: "text" | "email" | "number",
    iconName?: string
}

const InputText = forwardRef<HTMLInputElement, IInputTextProps>(
    ({ error, type = "text", label, helperText, id, iconName, className, ...props }, ref) => {
        return (
            <InputContainer
                label={label}
                error={error}
                helperText={helperText}
                id={id}
                className={className}
                disabled={props.disabled}
            >
                {
                    iconName && <Icon name={iconName} size="md" className={styles.input_icon} />
                }

                <input
                    ref={ref}
                    {...props}
                    id={id}
                    type={type}
                    className={`${styles.input} ${error ? styles.error : ""}`}
                    style={{ padding: type == "number" ? "12px" : "12px 3rem 12px 12px" }}
                    placeholder=" "
                    value={props.disabled ? "" : props.value}
                />
            </InputContainer>
        )
    })

export default InputText
