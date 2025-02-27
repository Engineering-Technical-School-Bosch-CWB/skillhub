import { ComponentPropsWithoutRef, forwardRef } from "react"
import styles from "./styles.module.css"
import Icon from "../Icon";

interface IAvatarProps extends ComponentPropsWithoutRef<'img'> {
    size?: "sm" | "md" | "lg" | "xl"
    tooltip?: string,
    onClick?: () => void;
}

const Avatar = forwardRef<HTMLImageElement, IAvatarProps>(
    ({ className, tooltip, size = "md", onClick, ...props }, ref) => (
        <div className={`${styles[size]} ${styles.avatar_container}`}>
            <img 
                ref={ref}
                alt={tooltip || "Avatar"}
                className={`${styles.avatar} ${className || ""}  ${onclick? styles.clickable : ""}`}
                {...props}
            />
            {
                (onClick) && 
                <span className={`${styles.edit_area}`} onClick={onClick}>
                    <Icon name="edit" size="lg"/> 
                </span>
            }
            {
                tooltip &&
                <span className={styles.tooltip}>{tooltip}</span>
            }
        </div>
    )
)

export default Avatar
