import { ChangeEvent } from "react";
import { ISelectProps } from "./interfaces"
import { t } from "i18next";

import styles from "./styles.module.css"

export default (data: ISelectProps) => {
    
    const onChange = (e: ChangeEvent<HTMLSelectElement>) => {
        if (data.onChange) data.onChange(e);
    }

    return (
        <div className={`${styles.select_container} ${data.className}`}>
            {
                data.label &&
                <label htmlFor={data.name} className={styles.label}>{data.label}</label>
            }
            <select
                name={data.name}
                id={data.id}
                className={styles.select_input}
                onChange={(e) => onChange(e)}
                disabled={data.disabled}
            >
                {
                    !data.hasDefault &&
                    <option className={`${styles.selection}`} selected>{data.label ?? t('components.select')}</option>
                }
                {
                    data.data.map((item, i) => {
                        return (
                            <option
                            key={i}
                                value={item.value}
                                disabled={item.disabled}
                                selected={item.selected}
                            >
                                {item.key}
                            </option>
                        )
                    })
                }
            </select>
        </div>
    )
}