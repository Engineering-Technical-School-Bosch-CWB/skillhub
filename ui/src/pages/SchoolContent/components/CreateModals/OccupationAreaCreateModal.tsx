import { useEffect, useState } from "react"
import { ICreateModalProps } from "./_CreateModal.interface"
import { OccupationArea } from "@/interfaces/models/IOccupationArea";

import styles from "../DeleteModals/styles.module.css"
import Input from "@/components/Input";
import { t } from "i18next";

export default ({ onChange, setDisabled }: ICreateModalProps) => {

    const [data, setData] = useState<OccupationArea>();

    const change = (key: keyof OccupationArea, value: any) => {
        setData(prev => ({
            ...prev!,
            [key]: value
        }))
    }

    useEffect(() => {
        onChange!(data);
        setDisabled!(!data?.name);
    }, [data]);

    return (
        <section className={styles.content_section}>
            <Input label={t('schoolContent.occupationArea.name')} value={data?.name} onChange={(e) => change("name", e.target.value)} maxLength={50} />
        </section>
    )
}