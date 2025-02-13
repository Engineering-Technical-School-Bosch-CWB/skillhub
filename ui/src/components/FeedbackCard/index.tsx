import Text from "@/typography";
import { IFeedbackCardProps } from "./Interfaces/FeedbackCard.interfaces";
import styles from "./style.module.css";
import Icon from "../Icon";

export default ({ color, title, subtitle, editButton, content, isPrivate }: IFeedbackCardProps) => {
    return (
        <>
            <div className={`${styles.identificationCard}`}>
                <div className={`${styles.space_between}`}>
                    <section className={`${styles.align}`}>
                        <section className={`${styles.identificationCardMarker}`} style={{ backgroundColor: color }}></section>
                        <section className={`${styles.cardContent}`}>
                            <Text fontWeight="bold">
                                {title}
                            </Text>
                            <Text fontWeight="semibold" fontSize="xs">
                                {subtitle}
                            </Text>
                        </section>
                    </section>
                    {
                        editButton &&
                        <span className={`${styles.evBtn} ${styles.align}`} onClick={() => editButton.action()}>
                            <Text fontSize="sm">{editButton.label}</Text>
                            <Icon name={"edit"} />
                        </span>
                    }
                </div>
                {
                    content &&
                    <Text>{content}</Text>
                }
                {
                    isPrivate &&
                    <div className={`${styles.not} ${styles.tooltip}`}>
                        <Icon name={"lock"} />
                        <span className={`${styles.tooltiptext}`}>Student can't see this feedback!</span>
                    </div>
                }
            </div>
        </>
    )
}