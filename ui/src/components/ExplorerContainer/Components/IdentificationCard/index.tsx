import { forwardRef } from "react";
import styles from "./styles.module.css"
import Text from "../../../../typography";
import Icon from "../../../Icon";
import IIdentificationCardProps from "./IIdentificationCardProps";


const IdentificationCard = forwardRef<HTMLButtonElement, IIdentificationCardProps>((
    {
        variant = "card", 
        color = "blue", 
        title = "",
        subtitle = "",
        icon = "",
        iconDetails = "",
        onClick,
    }) => 
        <div
            className={`${styles.identificationCard} ${variant == "list" ? styles.line : ""} ${styles.common} ${[variant]}`}
            onClick={() => onClick!()}
        >
            <section className={`${styles.identificationCardMarker}`} style={{backgroundColor: color}}></section>
            <section className={`${styles.cardContent}`}>
                <Text fontWeight="bold">{title}</Text>
                <div className={`${styles.seccondLine} ${styles.align}`}>
                    <Text fontWeight="semibold" fontSize="xs">{subtitle}</Text>
                    <div className={`${styles.align}`}>
                        <Icon size="sm" name={icon} />
                        <Text fontWeight="semibold" fontSize="xs" >{iconDetails} {variant }</Text>
                    </div>
                </div>
            </section>
        </div>
)


export default IdentificationCard;