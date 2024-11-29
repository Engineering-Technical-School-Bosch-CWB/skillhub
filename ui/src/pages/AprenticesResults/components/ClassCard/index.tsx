import { IClassCardProps } from "../../../../interfaces/aprenticeResults.interfaces";
import Text from "../../../../typography";
import styled from "./styles.module.css";

const ClassCard = ({ title, startDate, exploitation, color }: IClassCardProps) => {
    return (
        <div className={styled.card}>
            <div className={styled.color_container} style={{backgroundColor: color}}></div>
            <div className={styled.class}>
                <Text fontSize="md" fontWeight="semibold">{ title }</Text>
                <Text fontSize="sm" fontWeight="light">{ startDate }</Text>
            </div>
            <Text fontWeight="bold">{ exploitation }%</Text>
        </div>
    )
};

export default ClassCard;