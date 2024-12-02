import { forwardRef } from "react";
import { IStudentCardProps } from "./interfaces/IStudentCard.interfaces";

import styles from './style.module.css';
import Avatar from "../Avatar";
import Text from "../../typography";

export default forwardRef<HTMLImageElement, IStudentCardProps>(
    ({ 
        className = null, 
        tooltip = "", 
        size = "medium", 
        student,
        ...props 
    }, ref) => (
        <div className={`${styles[size]} ${styles.student_card}`}>
            {/* <img 
                
                ref={ref}
                alt={tooltip || "Avatar"}
                className={`${styles.avatar} ${className || ""}`}
                {...props}
            /> */}
            <Avatar src={student?.image?.image ?? "/avatar.png"} size="large"  /> 
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
        </div>
    )
)

