import styled from "./styles.module.css"
import { Link } from "react-router-dom"
import { ICardProps } from "../../../../interfaces/home.interfaces"
import Icon from "../../../../components/Icon"

export default ({ to, label, iconName, iconSize }: ICardProps) => {
    return (
        <div className={styled.linksCards}>
            <Link className={styled.link} to={ to }>
                <div className={styled.cardInside}>
                    <Icon name={iconName} size={iconSize}/>
                    <span className={styled.textCard}>{ label }</span>
                </div>
            </Link>
        </div>
    )
}