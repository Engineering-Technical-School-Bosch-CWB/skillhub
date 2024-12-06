import { ComponentPropsWithoutRef, forwardRef } from "react"
import styles from "./styles.module.css"

interface IAvatarProps extends ComponentPropsWithoutRef<'img'> {
    size?: "sm" | "md" | "lg" | "xl"
    tooltip?: string
}

const Avatar = forwardRef<HTMLImageElement, IAvatarProps>(
    ({ className, tooltip, size = "md", ...props }, ref) => (
        <div className={`${styles[size]} ${styles.avatar_container}`}>
            <img 
                ref={ref}
                alt={tooltip || "Avatar"}
                className={`${styles.avatar} ${className || ""}`}
                {...props}
            />
            {
                tooltip &&
                <span className={styles.tooltip}>{tooltip}</span>
            }
        </div>
    )
)

export default Avatar
