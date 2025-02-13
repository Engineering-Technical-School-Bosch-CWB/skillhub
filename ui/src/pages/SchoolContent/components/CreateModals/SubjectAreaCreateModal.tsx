import { useEffect, useState } from "react"
import { ICreateModalProps } from "./_CreateModal.interface"

import styles from '../DeleteModals/styles.module.css'
import Input from "@/components/Input";
import { SubjectArea } from "@/interfaces/models/ISubjectArea";

export default ({onChange}: ICreateModalProps) => {

    const [data, setData] = useState<SubjectArea>();

    const change = (key: keyof SubjectArea, value: any) => {
        setData(prev => ({
            ...prev!,
            [key]: value
        }))
    }

    useEffect(() => {
        onChange!(data)
    }, [data]);

    return (
        <section className={styles.content_section}>
            <Input label="Name" value={data?.name} onChange={(e) => change("name", e.target.value)} /> 
        </section>
    )
}