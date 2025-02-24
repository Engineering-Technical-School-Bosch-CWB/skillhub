import { forwardRef } from "react";
import styles from "./styles.module.css"
import Text from "../../../../typography";
import Icon from "../../../Icon";
import IIdentificationCardProps from "./interfaces";
import { Link } from "react-router-dom";

const IdentificationCard = forwardRef<HTMLButtonElement, IIdentificationCardProps>((
    {
        variant = "card", 
        color = "blue", 
        title = "",
        subtitle = "",
        iconDetails = "",
        goTo,
        archived = false
    }) => 
        <Link
            className={`${styles.identificationCard} ${variant == "list" ? styles.line : ""} ${archived ? styles.archived : ""} `}
            to={`${goTo}`}     
        >
            <section className={`${styles.align}`}>
                <section className={`${styles.identificationCardMarker} ${variant == "list" ? styles.identificationCardMarker_line : ""}`} style={{backgroundColor: color}}></section>
                <section className={`${styles.cardContent} ${variant == "list" ? styles.cardContent_line : ""}`}>
                    <Text fontWeight="bold">{title}</Text>
                    <div className={`${styles.seccondLine} ${styles.align}`}>
                        <Text fontWeight="semibold" fontSize="xs">{subtitle}</Text>
                    </div>
                </section>
            </section>
            <section>
                <div className={`${styles.align}`}>
                    {/* <Icon size="md" name={icon} className={styles.icon}/> */}
                    <Text fontWeight="bold" fontSize="xl" className={styles.info}>{iconDetails}</Text>
                </div>
            </section>
        </Link>
)


export default IdentificationCard;