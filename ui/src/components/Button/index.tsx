import { ComponentPropsWithoutRef, forwardRef } from "react";
import styles from "./styles.module.css"

interface IButtonProps extends ComponentPropsWithoutRef<'button'> {
    variant?: "contained" | "outlined" | "primary_icon" | "primary_label_icon" |
             "secondary_icon" | "secondary_label_icon" | "rounded" | "select_rounded" |
             "link"
    kind?: "success" | "alert" | "danger" | "default"
    
}

/**
 * `Button` component: A customizable button with support for different styles and native button properties.
 *
 * Props:
 * - `variant` (string, optional): Defines the button style. Options are:
 *   - `"contained"`: A solid, filled button (default).
 *   - `"outlined"`: A button with an outlined border.
 * - `className` (string, optional): Additional CSS class names for styling.
 * - Other props: Supports all additional props of a native `<button>` element.
 *
 * Example usage:
 * ```
 * import Button from "./Button";
 *
 * // Contained button
 * <Button variant="contained" onClick={() => console.log("Clicked!")}>
 *   Submit
 * </Button>
 *
 * // Outlined button with custom styles
 * <Button variant="outlined" className="custom-button-class">
 *   Cancel
 * </Button>
 */
const Button = forwardRef<HTMLButtonElement, IButtonProps>(({ variant = "outlined", kind = "default", className, ...props}, ref) => 
    <button
        ref={ref}
        {...props}
        className={`${styles.common} ${styles[variant]} ${styles[kind]} ${className}`}
    />
)

export default Button
