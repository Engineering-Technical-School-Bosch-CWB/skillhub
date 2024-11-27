import styled from "./styles.module.css"
import { Link } from "react-router-dom"
import { ICardProps } from "../../../../interfaces/home.interfaces"

export default ({ to, icon: Icon, label }: ICardProps) => {
    return (
        <div className={styled.linksCards}>
            <Link className={styled.link} to={ to }>
                <div className={styled.cardInside}>
                    <Icon/>
                    <span className={styled.textCard}>{ label }</span>
                </div>
            </Link>
        </div>
    )
}