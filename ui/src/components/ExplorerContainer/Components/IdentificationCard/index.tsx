import { forwardRef } from "react";
import styles from "./styles.module.css"
import Text from "../../../../typography";
import Icon from "../../../Icon";
import IIdentificationCardProps from "./IIdentificationCardProps";
import { Link } from "react-router-dom";


const IdentificationCard = forwardRef<HTMLButtonElement, IIdentificationCardProps>((
    {
        variant = "card", 
        color = "blue", 
        title = "",
        subtitle = "",
        icon = "",
        iconDetails = "",
        goTo,
    }) => 
        <Link
            className={`${styles.identificationCard} ${variant == "list" ? styles.line : ""} ${styles.common} ${[variant]}`}
            to={`${goTo}`}            
        >
            <section className={`${styles.align}`}>
                <section className={`${styles.identificationCardMarker}`} style={{backgroundColor: color}}></section>
                <section className={`${styles.cardContent}`}>
                    <Text fontWeight="bold">{title}</Text>
                    <div className={`${styles.seccondLine} ${styles.align}`}>
                        <Text fontWeight="semibold" fontSize="xs">{subtitle}</Text>
                    </div>
                </section>
            </section>
            <section>
                <div className={`${styles.align}`}>
                    <Icon size="md" name={icon} />
                    <Text fontWeight="semibold" fontSize="xl" >{iconDetails}</Text>
                </div>
            </section>
        </Link>
)


export default IdentificationCard;