import { ComponentPropsWithoutRef, forwardRef } from "react";
import styles from "./styles.module.css"
import Text from "../../typography";
import Icon from "../Icon";

type colors = "brown" | "red"

interface IIdentificationCardProps extends ComponentPropsWithoutRef<'button'>{
    variant?: "default" | "outlined",
    color?: string | colors,
    title?: string,
    subtitle?: string,
    icon?: string,
    iconDetails?: string
}


const IdentificationCard = forwardRef<HTMLButtonElement, IIdentificationCardProps>((
    {
        variant = "default", 
        color = "blue", 
        title = "",
        subtitle = "",
        icon = "",
        iconDetails = "",
        className,
    }) => 
        <div
            className={`${styles.identificationCard}  ${styles.common} ${[variant]} ${className}`}
        >
            <section className={`${styles.identificationCardMarker}`} style={{backgroundColor: color}}></section>
            <section className={`${styles.cardContent}`}>
                <Text fontWeight="bold">{title}</Text>
                <div className={`${styles.seccondLine} ${styles.align}`}>
                    <Text fontWeight="semibold" fontSize="xs">{subtitle}</Text>
                    <div className={`${styles.align}`}>
                        <Icon size="sm" name={icon} />
                        <Text fontWeight="semibold" fontSize="xs" >{iconDetails}</Text>
                    </div>
                </div>
            </section>
        </div>
)


export default IdentificationCard;