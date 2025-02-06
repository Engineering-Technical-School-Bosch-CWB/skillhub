import { useEffect, useState } from "react";
import { IDeleteModalProps } from "./_DeleteModal.interface"
import internalAPI from "@/service/internal.services";
import styles from "./styles.module.css";
import Text from "@/typography";
import { OccupationArea } from "@/interfaces/models/IOccupationArea";

export default ({id}: IDeleteModalProps) => {
    const [data, setData] = useState<OccupationArea>();

    const loadData = async () => {
        const response = await internalAPI.jsonRequest(`/occupationArea/${id}`,"GET");
        const _data = response.data as OccupationArea;
        console.log(response);
        
        setData(_data);
    }

    useEffect(() => {
        loadData();
    }, [])
    
    return (
        <section className={styles.content_section}>
            <Text>Name: {data?.name}</Text>
        </section>
    )
}