import styles from './styles.module.css';
import Input from "@/components/Input";
import Select from "@/components/Select";
import internalAPI from "@/service/internal.services";
import IOccupationArea from "@/interfaces/models/IOccupationArea";

import { useEffect, useState } from "react";
import { IUpdateModalProps } from "./_UpdateModal.interface"
import { ICourse } from "@/interfaces/models/ICourse";
import { ISelectData, ISelectProps } from "@/components/Select/interfaces";

export default ({ id, onChange, setDisabled }: IUpdateModalProps) => {

    const [selectData, setSelectData] = useState<ISelectProps>();
    const [data, setData] = useState<ICourse>();

    const getData = async () => {

        const courseResponse = await internalAPI.jsonRequest(`/course/${id}`, "GET");
        setData(courseResponse.data);

        const selectResponse = await internalAPI.jsonRequest(`/occupationArea?${new URLSearchParams({ id: courseResponse.data.occupationArea?.id ?? "" })}`, "GET")
        const occupationData = selectResponse.data as IOccupationArea[]

        const select: ISelectData[] = occupationData.map((e) => {
            return {
                key: e.name!,
                value: e.id!
            }
        })

        setSelectData(prev => ({
            ...prev,
            data: select
        }))
    }

    useEffect(() => {
        getData();
    }, [])

    const change = (key: keyof ICourse, value: any) => {
        setData(prev => ({
            ...prev!,
            [key]: value
        }))
    }
    useEffect(() => {
        onChange!(data);
        setDisabled!(!data?.name || !data.occupationAreaId);

        console.log(data);
    }, [data])

    return (
        <section className={styles.content_section}>
            <Input label="Name" value={data?.name} onChange={(e) => change("name", e.target.value)} maxLength={255} />
            {/* <Input label="Abbreviation" value={data?.abbreviation} onChange={(e) => change("abbreviation", e.target.value)} /> */}
            <Select data={selectData?.data ?? []}
                hasDefault={data?.occupationArea?.id != null}
                label={"Occupation Area"}
                onChange={(e) => change("occupationAreaId", Number(e.target.value))} />
        </section>
    )
}