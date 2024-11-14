import { ComponentPropsWithoutRef, forwardRef } from "react";
import styles from "./styles.module.css"

interface IBoschLogoProps extends ComponentPropsWithoutRef<'img'> {
    size?: "small" | "medium" | "large"
}

export default forwardRef<HTMLImageElement, IBoschLogoProps>(
    ({ className, size = "medium", ...props }, ref) => (
        <img 
            ref={ref}
            alt="Bosch Logo"
            src="/bosch_logo.png"
            className={`${styles[size]} ${className ? className : ""}`}
            {...props}
        />
    )
)