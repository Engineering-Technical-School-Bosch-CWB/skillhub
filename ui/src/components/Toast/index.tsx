import Text from "@/typography";
import { IToastContainerProps, IToastProps } from "./toast.interfaces";
import { toast as t } from "react-toastify";
import { ReactNode } from "react";

import styles from "./styles.module.css";
import Icon from "../Icon";

export const PersonalizedToast = ({title, message, icon}: IToastProps) : ReactNode=> {
    return (
        <div className={styles.toast_container}>
            {
                (title || message) &&
                <section className={styles.text_section}>
                    <Text fontWeight="bold">{title}</Text>
                    <Text fontSize="sm">{message}</Text>
                </section>
            }
            {
                icon &&
                <Icon size="md" name={icon}/>
            }
        </div>
    )
}

export const toast = ({data, toastId}: IToastContainerProps) => {
    return t(
        <PersonalizedToast {...data} />,
        {
            data: data,
            type: data?.kind,
            toastId: toastId
        }

    )
}