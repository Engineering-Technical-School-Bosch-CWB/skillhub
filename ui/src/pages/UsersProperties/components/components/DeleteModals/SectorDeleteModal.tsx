import { useEffect, useState } from "react"
import styles from '../DeleteModals/styles.module.css'
import { IDeleteModalProps } from "./_DeleteModal.interface";
import internalAPI from "@/service/internal.services";
import { toast } from "react-toastify";
import Text from "@/typography";
import ISector from "@/interfaces/models/ISector";

export default ({id}: IDeleteModalProps) => {

    const [data, setData] = useState<ISector>();

    const loadData = async () => {
        var response = await internalAPI.jsonRequest(`/sectors/${id}`, "GET")
        if(!response || response.statusCode != 200)
            toast.error("Error on load sector",{toastId: "sector-load-error"})
        var _data  = response.data as ISector
        setData(_data);
    }

    useEffect(() => {
        loadData()
    }, []);

    return (
        <section className={styles.content_section} >
            <span>
                <Text>Name: </Text>
                <Text>{data?.name}</Text>
            </span>
        </section>
    )
}