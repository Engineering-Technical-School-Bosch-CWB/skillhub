import { ComponentPropsWithoutRef, forwardRef } from "react";
import { Link } from "react-router-dom";
import styles from "./styles.module.css"

interface ILinkProps extends ComponentPropsWithoutRef<'a'> {
    to: string;
}

export default forwardRef<HTMLAnchorElement, ILinkProps>(({ className, ...props }, ref) => 
    <Link 
        ref={ref}
        {...props}
        className={`${styles.link} ${className}`}
    />
)
