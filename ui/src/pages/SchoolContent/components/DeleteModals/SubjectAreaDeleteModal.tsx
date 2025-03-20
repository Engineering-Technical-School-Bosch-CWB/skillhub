import { useEffect, useState } from "react";
import { IDeleteModalProps } from "./_DeleteModal.interface"
import internalAPI from "@/service/internal.services";
import styles from "./styles.module.css";
import Text from "@/typography";
import { SubjectArea } from "@/interfaces/models/ISubjectArea";

export default ({id}: IDeleteModalProps) => {
    const [data, setData] = useState<SubjectArea>();

    const loadData = async () => {
        const response = await internalAPI.jsonRequest(`/subjectAreas/${id}`,"GET");
        const _data = response.data as SubjectArea;
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