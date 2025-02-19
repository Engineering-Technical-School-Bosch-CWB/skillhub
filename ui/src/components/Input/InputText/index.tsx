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
                width={props.width}
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
                {
                    iconName && <Icon name={iconName} size="md" className={styles.input_icon} />
                }
            </InputContainer>
        )
    })

export default InputText
