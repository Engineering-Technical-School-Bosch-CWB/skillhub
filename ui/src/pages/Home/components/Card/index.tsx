import styles from "./styles.module.css"
import { Link } from "react-router-dom"
import { ICardProps } from "../../home.interfaces"
import Icon from "../../../../components/Icon"

export default ({ to, label, iconName, iconSize }: ICardProps) => {
    return (
        <div className={styles.linksCards}>
            <Link className={styles.link} to={ to }>
                <div className={styles.cardInside}>
                    <Icon name={iconName} size={iconSize}/>
                    <span className={styles.textCard}>{ label }</span>
                </div>
            </Link>
        </div>
    )
}