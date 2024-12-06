import { forwardRef } from "react";
import { IStudentCardProps } from "./interfaces/IStudentCard.interfaces";

import styles from './style.module.css';
import Avatar from "../Avatar";
import Text from "../../typography";
import { Link } from "react-router-dom";

export default forwardRef<HTMLImageElement, IStudentCardProps>(
    ({ 
        className = null, 
        tooltip = "", 
        size = "medium", 
        student,
        goTo,
        ...props 
    }, ref) => (
        <Link 
            className={`${styles[size]} ${styles.student_card}`}
            to={`${goTo}`}
        >
            <Avatar src={student?.image?.image ?? "/avatar.png"} size="xl"  /> 
            {
                tooltip &&
                <span className={styles.tooltip}>{tooltip}</span>
            }
            <div className={`${styles.details} ${styles.align}`}>
                <Text fontWeight="bold" >{student?.name}</Text> 
                <Text fontWeight="semibold" >
                    {student?.birthday?.getDate()} / {student?.birthday?.getMonth()}
                </Text> 
            </div>
        </Link>
    )
)

