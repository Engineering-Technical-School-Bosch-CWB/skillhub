import { ComponentPropsWithoutRef, forwardRef } from "react"
import styles from "./styles.module.css"

interface IInputProps extends ComponentPropsWithoutRef<'input'> {
    label?: string;
    fullwidth?: boolean;
}

export default forwardRef<HTMLInputElement, IInputProps>(({ label, id, fullwidth, ...props }, ref) => {
    return (
        <div className={`${styles.input_box} ${fullwidth ? styles.full_width : ""}`}>
            {label &&
                <label
                    htmlFor={id}
                    className={`${styles.label}`}
                >{label}</label>
            }
            <input 
                ref={ref}
                id={id}
                {...props}
                className={`${styles.input}`}
                placeholder=" "
            />
        </div>
    )
})
