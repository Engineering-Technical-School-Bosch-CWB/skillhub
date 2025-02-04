import { IPositionCardProps } from "./interfaces";
import styles from "./styles.module.css";
import Text from "@/typography";

export default ({ position, name, score }: IPositionCardProps) => {

    const getBgColor = (position: number): string => {
        if (position! <= 6) {
            return styles.green;
        } if (position! <= 12) {
            return styles.yellow;
        }
        return styles.red;
    }

    const abbreviate = (name: string) => {
        return !name ? name : (name!.split(' ')[0] + ' ' + name!.split(' ')[1][0].toUpperCase() + ".")
    }

    return (
        <>
            <div className={`${styles.card} ${getBgColor(position!)}`}>
                <Text fontSize="sm" fontWeight="semibold">Class Position</Text>
                <Text fontSize="xl5" fontWeight="bold">{!position ? "-" : `${position}°`}</Text>
                <span className={`${styles.spacing}`}>
                    <Text fontSize="lg" fontWeight="bold">{abbreviate(name)}</Text>
                    <Text fontSize="sm" fontWeight="bold">{`${score}%`}</Text>
                </span>
            </div>
        </>
    )
}