import { ComponentPropsWithoutRef, forwardRef } from "react"
import styles from "./styles.module.css"
import { v4 as uuid } from "uuid";

interface IInputProps extends ComponentPropsWithoutRef<'input'> {
    label?: string;
    fullwidth?: boolean;
}

export default forwardRef<HTMLInputElement, IInputProps>(
    ({ label, fullwidth, id = uuid(),  ...props }, ref) => {
    return (
        <div className={`${styles.input_box} ${fullwidth ? styles.full_width : ""}`}>
            <input 
                ref={ref}
                id={id}
                {...props}
                className={`${styles.input}`}
                placeholder=" "
            />
            {label &&
                <label
                    htmlFor={id}
                    className={`${styles.label}`}
                >{label}</label>
            }
        </div>
    )
})
