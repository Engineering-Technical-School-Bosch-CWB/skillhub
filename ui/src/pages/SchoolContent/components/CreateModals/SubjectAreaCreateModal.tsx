import { useEffect, useState } from "react"
import { ICreateModalProps } from "./_CreateModal.interface"

import styles from '../DeleteModals/styles.module.css'
import Input from "@/components/Input";
import { SubjectArea } from "@/interfaces/models/ISubjectArea";

export default ({ onChange, setDisabled }: ICreateModalProps) => {

    const [data, setData] = useState<SubjectArea>();

    const change = (key: keyof SubjectArea, value: any) => {
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
            <Input label="Name" value={data?.name} onChange={(e) => change("name", e.target.value)} maxLength={50} />
        </section>
    )
}