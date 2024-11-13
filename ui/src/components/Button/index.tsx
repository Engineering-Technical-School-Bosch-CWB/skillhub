import { ComponentPropsWithoutRef, forwardRef } from "react";
import styles from "./styles.module.css"

interface IButtonProps extends ComponentPropsWithoutRef<'button'> {
    variant?: "contained" | "outlined";
}

export default forwardRef<HTMLButtonElement, IButtonProps>(({ variant = "outlined", className, ...props}, ref) => 
    <button
        ref={ref}
        {...props}
        className={`${styles.common} ${styles[variant]} ${className}`}
    />
)
