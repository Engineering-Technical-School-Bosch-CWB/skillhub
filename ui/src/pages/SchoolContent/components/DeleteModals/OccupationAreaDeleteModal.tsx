import { useEffect, useState } from "react";
import { IDeleteModalProps } from "./_DeleteModal.interface"
import internalAPI from "@/service/internal.services";
import styles from "./styles.module.css";
import Text from "@/typography";
import { OccupationArea } from "@/interfaces/models/IOccupationArea";
import { t } from "i18next";

export default ({id}: IDeleteModalProps) => {
    const [data, setData] = useState<OccupationArea>();

    const loadData = async () => {
        const response = await internalAPI.jsonRequest(`/occupationArea/${id}`,"GET");
        const _data = response.data as OccupationArea;
        
        setData(_data);
    }

    useEffect(() => {
        loadData();
    }, [])
    
    return (
        <section className={styles.content_section}>
            <Text>{t('schoolContent.occupationArea.name')}: {data?.name}</Text>
        </section>
    )
}