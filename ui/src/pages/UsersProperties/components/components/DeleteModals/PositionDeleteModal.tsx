import { useEffect, useState } from "react"
import styles from '../DeleteModals/styles.module.css'
import IPosition from "@/interfaces/models/IPosition";
import { IDeleteModalProps } from "./_DeleteModal.interface";
import internalAPI from "@/service/internal.services";
import { toast } from "react-toastify";
import Text from "@/typography";
import { t } from "i18next";

export default ({id}: IDeleteModalProps) => {

    const [data, setData] = useState<IPosition>();

    const loadData = async () => {
        var response = await internalAPI.jsonRequest(`/positions/${id}`, "GET")
        if(!response || response.statusCode != 200)
            toast.error("Error on load position",{toastId: "position-load-error"})
        var _data  = response.data as IPosition
        setData(_data);
    }

    useEffect(() => {
        loadData()
    }, []);

    return (
        <section className={styles.content_section} >
            <span>
                <Text>{t(`usersOverview.properties.position.name`)}: </Text>
                <Text>{data?.name}</Text>
            </span>
            <span>
                <Text>{t(`usersOverview.properties.position.level`)}: </Text>
                <Text>{data?.positionLevel}</Text>
            </span>
        </section>
    )
}