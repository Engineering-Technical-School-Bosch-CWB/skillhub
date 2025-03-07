import { useEffect, useState } from "react";
import { IUpdateModalProps } from "./_UpdateModal.interface"
import { ICourse } from "@/interfaces/models/ICourse";
import internalAPI from "@/service/internal.services";

import styles from './styles.module.css';
import Input from "@/components/Input";
import Select from "@/components/Select";
import { ISelectData, ISelectProps } from "@/components/Select/interfaces";
import IOccupationArea from "@/interfaces/models/IOccupationArea";

export default ({id, onChange}: IUpdateModalProps) => {

    const [selectData, setSelectData] = useState<ISelectProps>();
    const [data, setData] = useState<ICourse>();

    const loadData = async () => {
        let response = await internalAPI.jsonRequest(`/course/${id}`,"GET");
        let _data = response.data as ICourse;
        setData(_data);

        response = await internalAPI.jsonRequest(`/occupationArea?page=1&items=100`, "GET")
        let _occupationData = response.data as IOccupationArea[]
        const _select: ISelectData[] = _occupationData.map((e) => {return {
            key: e.name!,
            value: e.id!
        }})
        
        setSelectData(prev => ({
            ...prev,
            data: _select
        }))
    }

    useEffect(() => {
        loadData();
    }, [])

    const change = (key: keyof ICourse, value: any) => {
        setData(prev => ({
            ...prev!,
            [key]: value
        }))
    }
    useEffect(() => {
        onChange!(data)
    }, [data])

    return(
        <section className={styles.content_section}>
            <Input label="Name" value={data?.name} onChange={(e) => change("name", e.target.value)} maxLength={255} />
            {/* <Input label="Abbreviation" value={data?.abbreviation} onChange={(e) => change("abbreviation", e.target.value)} /> */}
            <Select data={selectData?.data ?? []} hasDefault={true} label={data?.name} onChange={(e) => change("occupationArea", e.target.value)} />
        </section>
    )

    return <></>
}