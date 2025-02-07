import { useEffect, useState } from "react"
import { ICreateModalProps } from "./_CreateModal.interface"
import Input from "@/components/Input";

import styles from '../DeleteModals/styles.module.css'
import IPosition from "@/interfaces/models/IPosition";
import Select from "@/components/Select";
import { ISelectProps } from "@/components/Select/interfaces";

export default ({onChange}: ICreateModalProps) => {

    const [data, setData] = useState<IPosition>();

    const positionLevelSelectProps: ISelectProps = {
        label: "Position Level",
        data: [
            {
                key: "Admin",
                value: 2
            },
            {
                key: "Default",
                value: 1
            },
        ],
        onChange(e) {
            change("positionLevel", e.target.value)
        },
    }

    const change = (key: keyof IPosition, value: any) => {
        setData(prev => ({
            ...prev!,
            [key]: value
        }))
    }

    useEffect(() => {
        onChange!(data)
    }, [data]);

    return (
        <section className={styles.content_section} >
            <Input label="Name" value={data?.name} onChange={(e) => change("name", e.target.value)} />
            <Select {...positionLevelSelectProps} />
        </section>
    )
}