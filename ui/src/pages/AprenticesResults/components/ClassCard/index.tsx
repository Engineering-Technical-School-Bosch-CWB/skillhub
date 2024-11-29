import { IClassCardProps } from "../../../../interfaces/aprenticeResults.interfaces";
import styled from "./styles.module.css";

const ClassCard = ({ title, startDate, exploitation }: IClassCardProps) => {
    return (
        <div className={styled.card}>
            <div className={styled.class}>
                <p>{ title }</p>
                <p>{ startDate }</p>
            </div>
            <p>{ exploitation }%</p>
        </div>
    )
};

export default ClassCard;