import { ComponentPropsWithoutRef, forwardRef } from "react";
import styles from "./styles.module.css"

interface IBoschLogoProps extends ComponentPropsWithoutRef<'img'> {
    size?: "small" | "medium" | "large"
}

/**
 * `BoschLogo` component: A reusable image component for displaying the Bosch logo.
 * Supports custom sizes and additional image properties.
 *
 * Props:
 * - `size` (string, optional): Defines the size of the logo. Options are: `"small"`, `"medium"` or `"large"`
 * - `className` (string, optional): Additional CSS class names for styling.
 * - Other props: All additional props supported by a native `<img>` element.
 *
 * Example usage:
 * ```
 * import BoschLogo from "./BoschLogo";
 *
 * // Default size (medium)
 * <BoschLogo />
 *
 * // Small size with additional styling
 * <BoschLogo size="small" className="custom-logo-class" />
 *
 * // Large size with custom alt text
 * <BoschLogo size="large" alt="Custom Bosch Logo" />
 * ```
 *
 * Notes:
 * - The `src` for the image is pre-set to `/bosch_logo.png`.
 * - The `alt` text defaults to `"Bosch Logo"` but can be overridden using props.
 * - The `size` prop applies pre-defined styles from `styles.module.css`.
 */
const BoschLogo = forwardRef<HTMLImageElement, IBoschLogoProps>(
    ({ className, size = "medium", ...props }, ref) => (
        <img 
            ref={ref}
            alt="Bosch Logo"
            src="https://ctp-ets.br.bosch.com/SkillHub/bosch_logo.png"
            className={`${styles[size]} ${className ? className : ""}`}
            {...props}
        />
    )
)

export default BoschLogo
