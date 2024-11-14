import { ComponentPropsWithoutRef, forwardRef } from "react";
import styles from "./styles.module.css"

interface IButtonProps extends ComponentPropsWithoutRef<'button'> {
    variant?: "contained" | "outlined";
}

/**
 * Reusable `Button` component with customizable styling variants.
 * Supports all standard HTML button properties and includes options for "contained" and "outlined" variants.
 * Utilizes `forwardRef` to allow parent components to access the button’s DOM element.
 *
 * @param {IButtonProps} props - The properties object for configuring the `Button` component.
 * @param {("contained" | "outlined")} [props.variant="outlined"] - Optional style variant for the button. Defaults to "outlined" if not specified.
 * @param {string} [props.className] - Optional additional CSS class name(s) for custom styling.
 * @param {React.Ref<HTMLButtonElement>} ref - Optional ref passed down to access the button DOM element.
 * @returns {JSX.Element} The styled button element.
 *
 * @example
 * ```tsx
 * <Button
 *   variant="contained"
 *   className="custom-button"
 *   onClick={() => console.log("Button clicked!")}
 * >
 *   Click Me
 * </Button>
 * ```
 */
export default forwardRef<HTMLButtonElement, IButtonProps>(({ variant = "outlined", className, ...props}, ref) => 
    <button
        ref={ref}
        {...props}
        className={`${styles.common} ${styles[variant]} ${className}`}
    />
)
