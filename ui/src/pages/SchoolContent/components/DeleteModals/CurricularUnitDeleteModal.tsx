import { useEffect, useState } from "react";
import { IDeleteModalProps } from "./_DeleteModal.interface"
import internalAPI from "@/service/internal.services";
import { CurricularUnit } from "@/interfaces/models/ICurricularUnit";
import styles from "./styles.module.css";
import Text from "@/typography";

export default ({id}: IDeleteModalProps) => {
    const [data, setData] = useState<CurricularUnit>();

    const loadData = async () => {
        const response = await internalAPI.jsonRequest(`/curricularUnits/${id}`,"GET");
        const _data = response.data as CurricularUnit;
        console.log(_data);
        setData(_data);
    }

    useEffect(() => {
        loadData();
    }, [])
    
    return (
        <section className={styles.content_section}>
            <Text>Name: {data?.name}</Text>
            <Text>Area: {data?.subjectArea?.name}</Text>
        </section>
    )
}