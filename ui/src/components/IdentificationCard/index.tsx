import { ComponentPropsWithoutRef, forwardRef } from "react";
import styles from "./styles.module.css"

type colors = "brown" | "red"

interface IIdentificationCardProps extends ComponentPropsWithoutRef<'button'>{
    variant?: "default" | "outlined",
    color?: string | colors 
}



const IdentificationCard = forwardRef<HTMLButtonElement, IIdentificationCardProps>(({variant = "default", color = "blue" , className, ...props}, ref) => 
    <div
        className={`${styles.identificationCard}  ${styles.common} ${[variant]} ${className}`}
    >
        <section className={`${styles.identificationCardMarker}`} style={{backgroundColor: color}}></section>
        <section>
            <h2>DTA 2022</h2>
            <div>
                <p>2022 / 01</p>
                <p>P18</p>
            </div>
        </section>
    </div>
)


export default IdentificationCard;