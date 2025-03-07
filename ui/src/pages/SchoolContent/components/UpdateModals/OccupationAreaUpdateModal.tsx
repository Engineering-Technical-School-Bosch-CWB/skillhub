import internalAPI from "@/service/internal.services";
import { IUpdateModalProps } from "./_UpdateModal.interface"
import styles from './styles.module.css';
import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import Input from "@/components/Input";
import { OccupationArea } from "@/interfaces/models/IOccupationArea";

export default ({ id, onChange, setDisabled }: IUpdateModalProps) => {

    const [data, setData] = useState<OccupationArea>();
    const loadData = async () => {
        let response = await internalAPI.jsonRequest(`/occupationArea/${id}`, "GET")
        if (!response || response.statusCode != 200)
            toast.error(`Error on load object`, { toastId: "subject-area-load-error" });

        setData(response.data as OccupationArea);
    }

    useEffect(() => {
        loadData();
    }, [])

    const change = (key: keyof OccupationArea, value: any) => {
        setData(prev => ({
            ...prev!,
            [key]: value
        }))
    }

    useEffect(() => {
        onChange!(data);
        setDisabled(!data?.name);
    }, [data])

    return (
        <section className={styles.content_section}>
            <Input label="Name" value={data?.name} onChange={(e) => change("name", e.target.value)} maxLength={50} />
        </section>
    )
}