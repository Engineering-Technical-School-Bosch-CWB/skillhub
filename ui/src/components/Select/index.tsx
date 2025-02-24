import { ChangeEvent, useEffect, useState } from "react";
import { ISelectData, ISelectProps } from "./interfaces"

import styles from "./styles.module.css"

export default (data: ISelectProps) => {
    // const [selectedValue, setSelectedValue] = useState(data.data.filter((e) => e.selected)[0].value || "" );

    const onChange = (e: ChangeEvent<HTMLSelectElement>) => {
        if (data.onChange) data.onChange(e);
    }

    useEffect(() => {
        console.log(data);
        
    },[data])

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