import { Link } from "react-router-dom";
import { IClassCardProps } from "../../aprenticeResults.interfaces";
import Text from "../../../../typography";
import styled from "./styles.module.css";

const ClassCard = ({ title, startDate, exploitation, color, goTo }: IClassCardProps) => {
    return (
        <div className={styled.card}>
            <Link to={goTo} className={styled.link}>
                <div className={styled.color_container} style={{backgroundColor: color}}></div>
                <div className={styled.class}>
                    <Text fontSize="md" fontWeight="semibold">{ title }</Text>
                    <Text fontSize="sm" fontWeight="light">{ startDate }</Text>
                </div>
                <Text fontWeight="bold">{ exploitation }%</Text>
            </Link>
        </div>
    )
};

export default ClassCard;