import { forwardRef } from "react";
import { IStudentCardProps } from "./interfaces/IStudentCard.interfaces";

import styles from './style.module.css';
import Avatar from "../Avatar";
import Text from "../../typography";
import { Link } from "react-router-dom";

export default forwardRef<HTMLImageElement, IStudentCardProps>(
    ({
        tooltip = "",
        size = "medium",
        goTo,
        ...props
    }, ref) => (
        <Link
            className={`${styles[size]} ${styles.student_card}`}
            to={`${goTo}`}
        >
            <Avatar src={props?.image ?? "/avatar.png"} size="xl" />
            {
                tooltip &&
                <span className={styles.tooltip}>{tooltip}</span>
            }
            <div className={`${styles.details} ${styles.align}`}>
                <Text fontWeight="bold" >{props.name}</Text>
                <Text fontWeight="semibold" >
                    {props.birthday}
                </Text>
            </div>
        </Link>
    )
)

