import { useEffect, useState } from "react";
import { IDeleteModalProps } from "./_DeleteModal.interface"
import internalAPI from "@/service/internal.services";
import { CurricularUnit } from "@/interfaces/models/ICurricularUnit";
import styles from "./styles.module.css";
import Text from "@/typography";
import { t } from "i18next";

export default ({id}: IDeleteModalProps) => {
    const [data, setData] = useState<CurricularUnit>();

    const loadData = async () => {
        const response = await internalAPI.jsonRequest(`/curricularUnits/${id}`,"GET");
        const _data = response.data as CurricularUnit;
        setData(_data);
    }

    useEffect(() => {
        loadData();
    }, [])
    
    return (
        <section className={styles.content_section}>
            <Text>{t('schoolContent.curricularUnits.name')}: {data?.name}</Text>
            <Text>{t('schoolContent.curricularUnits.subjectArea')}: {data?.subjectArea?.name}</Text>
        </section>
    )
}