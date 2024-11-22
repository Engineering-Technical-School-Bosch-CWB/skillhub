import { ComponentPropsWithoutRef, forwardRef } from "react"
import styles from "./styles.module.css"
import { v4 as uuid } from "uuid";

interface IInputProps extends ComponentPropsWithoutRef<'input'> {
    label?: string
    fullwidth?: boolean
    error?: string
}

/**
 * Reusable `Input` component with an optional label and full-width styling.
 * Allows for all standard HTML input properties, custom styling, and label positioning.
 * Uses `forwardRef` for easy access to the input's DOM element from parent components.
 *
 * @param {IInputProps} props - The properties object for configuring the `Input` component.
 * @param {string} [props.label] - Optional label text displayed above the input field.
 * @param {boolean} [props.fullwidth] - If `true`, the input will expand to occupy the full width of its container.
 * @param {string} [props.className] - Optional additional CSS class name(s) for custom styling.
 * @param {string} [props.id=uuid()] - Optional unique identifier for the input; defaults to a generated UUID if not provided.
 * @param {React.Ref<HTMLInputElement>} ref - Optional ref passed down to access the input DOM element.
 * @returns {JSX.Element} The styled input component with label.
 *
 * @example
 * ```tsx
 * <Input
 *   label="Username"
 *   fullwidth
 *   className="custom-input"
 *   onChange={(e) => console.log(e.target.value)}
 * />
 * ```
 */
export default forwardRef<HTMLInputElement, IInputProps>(
    ({ label, fullwidth, className, error, id = uuid(), ...props }, ref) => {
    
    return (
        <div className={`${styles.input_box} ${fullwidth ? styles.full_width : ""}`}>
            <input 
                ref={ref}
                id={id}
                {...props}
                className={`${styles.input} ${className}`}
                placeholder=" "
            />

            {label &&
                <label
                    htmlFor={id}
                    className={`${styles.label}`}
                >{label}</label>
            }

            {error &&
                <span
                    className={`${styles.error}`}
                >{error}</span>
            }
        </div>
    )
})
