import { useEffect, useState } from "react"
import Input from "@/components/Input";

import styles from '../DeleteModals/styles.module.css'
import IPosition from "@/interfaces/models/IPosition";
import Select from "@/components/Select";
import { ISelectProps } from "@/components/Select/interfaces";
import { IUpdateModalProps } from "./_UpdateModal.interface";
import internalAPI from "@/service/internal.services";
import { toast } from "react-toastify";
import { t } from "i18next";

export default ({onChange, id}: IUpdateModalProps) => {

    const [data, setData] = useState<IPosition>();

    const [positionLevelSelectProps, setSelectProps] = useState<ISelectProps>({
        label: t(`usersOverview.properties.position.level`),
        data: [
            {
                key: "Default",
                value: 1
            },
            {
                key: "Admin",
                value: 2
            },
        ],
        onChange(e) {
            change("positionLevel", e.target.value)
        },
    })

    const loadData = async () => {
        var response = await internalAPI.jsonRequest(`/positions/${id}`, "GET");
        if(!response || response.statusCode != 200)
            toast.error("Error on load position", { toastId: "position-load-error"})
        var _data = response.data as IPosition;
        setData(_data);
        var tempSelect = positionLevelSelectProps;
        
        if(typeof(_data.positionLevel) == "string") {
            if(_data?.positionLevel == "Admin") {
                tempSelect.data[1].selected = true;
            } else {
                tempSelect.data[0].selected = true;
            }
        }
        setSelectProps(tempSelect)
    }

    const change = (key: keyof IPosition, value: any) => {
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
            <Input label={t(`usersOverview.properties.position.name`)} value={data?.name} onChange={(e) => change("name", e.target.value)} />
            <Select {...positionLevelSelectProps} />
        </section>
    )
}