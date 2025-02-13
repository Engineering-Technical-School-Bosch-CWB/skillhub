import internalAPI from "@/service/internal.services";
import { IUpdateModalProps } from "./_UpdateModal.interface"
import styles from './styles.module.css';
import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import Input from "@/components/Input";
import { SubjectArea } from "@/interfaces/models/ISubjectArea";

export default ({id, onChange}: IUpdateModalProps) => {

    const [data, setData] = useState<SubjectArea>();
    const loadData = async () => {
        let response = await internalAPI.jsonRequest(`/subjectAreas/${id}`, "GET")
        if(!response || response.statusCode != 200)
            toast.error(`Error on load object`, {toastId: "subject-area-load-error"});

        setData(response.data as SubjectArea);
    }

    useEffect(() => {
        loadData();
    },[])

    const change = (key: keyof SubjectArea, value: any) => {
        setData(prev => ({
            ...prev!,
            [key]: value
        }))
    }

    useEffect(() => {
        onChange!(data);
    }, [data])

    return (
        <section className={styles.content_section}>
            <Input label="Name" value={data?.name} onChange={(e) => change("name", e.target.value)} />
        </section>
    )
}