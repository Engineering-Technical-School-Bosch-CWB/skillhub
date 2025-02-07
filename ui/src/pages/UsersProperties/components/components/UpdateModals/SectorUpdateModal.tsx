import { useEffect, useState } from "react"
import Input from "@/components/Input";

import styles from '../DeleteModals/styles.module.css'
import ISector from "@/interfaces/models/ISector";
import { IUpdateModalProps } from "./_UpdateModal.interface";
import internalAPI from "@/service/internal.services";
import { toast } from "react-toastify";

export default ({onChange, id}: IUpdateModalProps) => {

    const [data, setData] = useState<ISector>();

    const loadData = async () => {
        var response = await internalAPI.jsonRequest(`/sectors/${id}`, "GET");
        if(!response || response.statusCode != 200)
            toast.error("Error on load sector", { toastId: "sector-load-error"})
        var _data = response.data as ISector;
        setData(_data);
    }

    const change = (key: keyof ISector, value: any) => {
        setData(prev => ({
            ...prev!,
            [key]: value
        }))
    }

    useEffect(() => {
        onChange!(data)
    }, [data]);
    useEffect(() => {
        loadData();
    }, []);

    return (
        <section className={styles.content_section} >
            <Input label="Name" value={data?.name} onChange={(e) => change("name", e.target.value)} />
        </section>
    )
}