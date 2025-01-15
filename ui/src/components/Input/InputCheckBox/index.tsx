import { forwardRef } from "react"
import styles from "../styles.module.css"
import { IInputType, IRootInputProps } from "../interfaces"
import Icon from "../../Icon"
import CheckBoxContainer from "../CheckBoxContainer"

export interface IInputCheckBoxProps extends IRootInputProps {
    type?: IInputType,
    iconName?: string
}

const InputCheckBox = forwardRef<HTMLInputElement, IInputCheckBoxProps>(
    ({ error, type = "checkbox", label, helperText, id, iconName, className, ...props }, ref) => 
{
    return (
        <CheckBoxContainer
            label={label ?? ""}
            error={error ?? false}
            helperText={helperText}
            id={id}
            className={className}
        >

            {
                iconName && <Icon name={iconName} size="md" className={styles.input_icon}/>
            }

            <input
                ref={ref}
                {...props}
                id={id}
                type="checkbox"
                className={`${styles.input} ${error ? styles.error : ""}`}
                placeholder=" "
            />
        </CheckBoxContainer>
    )
})

export default InputCheckBox
