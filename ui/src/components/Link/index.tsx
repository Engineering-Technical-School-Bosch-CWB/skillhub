import { ComponentPropsWithoutRef, forwardRef } from "react";
import { Link as RouterDomLink } from "react-router-dom";
import styles from "./styles.module.css"

interface ILinkProps extends ComponentPropsWithoutRef<'a'> {
    to: string;
}


/**
 * `Link` component: A styled wrapper for `react-router-dom`'s `Link`.
 *
 * Props:
 * - `to` (string, required): The destination path.
 * - Other props: Supports all additional props of a native `<a>` element.
 *
 * Example usage:
 * ```
 * import Link from "./Link";
 * <Link to={RouteMap.HOME}>Go to Home</Link>
 * ```
 */
const Link = forwardRef<HTMLAnchorElement, ILinkProps>(({ className, ...props }, ref) => 
    <RouterDomLink 
        ref={ref}
        {...props}
        className={`${styles.link} ${className}`}
    />
)

export default Link
