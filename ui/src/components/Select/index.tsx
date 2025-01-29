import { ChangeEvent } from "react";
import { ISelectProps } from "./interfaces"

import styles from "./styles.module.css"

export default (data: ISelectProps) => {

    const onChange = (e: ChangeEvent<HTMLSelectElement>) => {
        if (data.onChange)
            data.onChange!(e);
    }

    return (
        <div className={styles.select_container}>
            {/* <label htmlFor={data.name} className={styles.label}>{data.label}</label> */}
            <select
                name={data.name}
                id={data.id}
                className={styles.select_input}
                onChange={(e) => onChange(e)}
            >
                {
                    !data.hasDefault &&
                        <option className={`${styles.selection}`} selected>{data.label ?? "Select a value"}</option>
                }
                {
                    data.data.map((item, index) => {
                        return (
                            <>
                                <option
                                    value={item.value}
                                    disabled={item.disabled}
                                    selected={item.selected}
                                >
                                    {item.key}
                                </option>
                            </>
                        )
                    })
                }
            </select>
        </div>
    )
}