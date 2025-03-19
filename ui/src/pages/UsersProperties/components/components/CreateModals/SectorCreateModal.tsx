import { useEffect, useState } from "react"
import { ICreateModalProps } from "./_CreateModal.interface"
import Input from "@/components/Input";

import styles from '../DeleteModals/styles.module.css'
import ISector from "@/interfaces/models/ISector";
import { t } from "i18next";

export default ({onChange}: ICreateModalProps) => {

    const [data, setData] = useState<ISector>();



    const change = (key: keyof ISector, value: any) => {
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
            <Input label={t(`usersOverview.properties.sector.name`)} value={data?.name} onChange={(e) => change("name", e.target.value)} />
        </section>
    )
}