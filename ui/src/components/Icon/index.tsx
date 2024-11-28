import { ComponentPropsWithoutRef, forwardRef } from "react"
import styles from "./styles.module.css"

interface IIConProps extends ComponentPropsWithoutRef<'span'> {
    name: string
    size?: "sm" | "md" | "lg" | "inherit"
}

const Icon = forwardRef<HTMLSpanElement, IIConProps>(({ name, size = "inherit", className, ...props }, ref) => {
    return(
        <span 
            ref={ref}
            className={`material-symbols-sharp ${styles.icon} ${styles[size]} ${className}`}
            {...props}
        >
            { name }
        </span>
    )
})

export default Icon
