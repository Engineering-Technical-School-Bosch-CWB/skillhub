import { ComponentPropsWithoutRef, forwardRef } from "react"
import styles from "./styles.module.css"
import Icon from "../Icon";

interface IAvatarProps extends ComponentPropsWithoutRef<'img'> {
    size?: "sm" | "md" | "lg" | "xl"
    tooltip?: string,
    onEditClick?: () => void;
}

const Avatar = forwardRef<HTMLImageElement, IAvatarProps>(
    ({ className, tooltip, size = "md", onEditClick, ...props }, ref) => (
        <div className={`${styles[size]} ${styles.avatar_container}`}>
            <img 
                ref={ref}
                alt={tooltip || "Avatar"}
                className={`${styles.avatar} ${className || ""}  ${onEditClick? styles.clickable : ""}`}
                {...props}
            />
            {
                (onEditClick) && 
                <span className={`${styles.edit_area}`} onClick={onEditClick}>
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
