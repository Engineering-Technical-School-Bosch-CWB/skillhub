import Text from "@/typography";
import { useEffect, useState } from "react"
import { IDeleteModalProps } from "./_DeleteModal.interface";
import internalAPI from "@/service/internal.services";
import { ICourse } from "@/interfaces/models/ICourse";

import styles from "./styles.module.css";

export default ({id}: IDeleteModalProps) => {

    const [data, setData] = useState<ICourse>();

    const loadData = async () => {
        const response = await internalAPI.jsonRequest(`/course/${id}`,"GET");
        const _data = response.data as ICourse;
        console.log(_data);
        setData(_data);
    }

    useEffect(() => {
        loadData();
    }, [])

    return(
        <section className={styles.content_section}>
            <Text>Name: {data?.name}</Text>
            <Text>Abbreviation: {data?.abbreviation}</Text>
            <Text>Area: {data?.occupationArea?.name}</Text>
        </section>
    )
}