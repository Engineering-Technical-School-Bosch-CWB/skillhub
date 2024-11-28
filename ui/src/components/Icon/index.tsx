import { ComponentPropsWithoutRef, forwardRef } from "react"
import styles from "./styles.module.css"

interface IIConProps extends ComponentPropsWithoutRef<'span'> {
    name: string
    size?: "sm" | "md" | "lg" | "inherit"
}

/**
 * `Icon` component: A wrapper for Google Material Symbols icons with customizable size and styling.
 *
 * Props:
 * - `name` (string, required): The name of the Material Symbol to display (e.g., `"home"`, `"search"`).
 * - `size` (string, optional): Defines the icon size. Options are:
 *   - `"sm"`: Small size.
 *   - `"md"`: Medium size.
 *   - `"lg"`: Large size.
 *   - `"inherit"` (default): Inherits the size from the parent element.
 * - Other props: Supports all additional props of a native `<span>` element.
 *
 * Example usage:
 * ```
 * import Icon from "./Icon";
 *
 * // Small home icon
 * <Icon name="home" size="sm" />
 *
 * // Medium search icon with additional styling
 * <Icon name="search" size="md" className="custom-icon" />
 *
 * // Large settings icon
 * <Icon name="settings" size="lg" />
 *
 * // Icon inheriting size from parent element
 * <Icon name="account_circle" />
 * ```
 */
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
