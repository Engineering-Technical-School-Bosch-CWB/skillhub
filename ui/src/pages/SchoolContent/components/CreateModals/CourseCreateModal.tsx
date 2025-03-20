import { useEffect, useState } from "react"
import { ICreateModalProps } from "./_CreateModal.interface"
import { ICourse } from "@/interfaces/models/ICourse";
import { ISelectData, ISelectProps } from "@/components/Select/interfaces";
import internalAPI from "@/service/internal.services";
import { toast } from "react-toastify";
import { OccupationArea } from "@/interfaces/models/IOccupationArea";
import Input from "@/components/Input";
import Select from "@/components/Select";

import styles from '../DeleteModals/styles.module.css'
import { t } from "i18next";

export default ({ onChange, setDisabled }: ICreateModalProps) => {

    const [data, setData] = useState<ICourse>();
    const [occupationAreaSelect, setOccupationArea] = useState<ISelectProps>();

    const loadData = async () => {
        var response = await internalAPI.jsonRequest("/occupationArea?page=1&items=100", "GET")
        if (!response || response.statusCode != 200)
            toast.error(`Error on load Subject Areas`, { toastId: `subject-areas-load-error` });

        let _data = response.data as OccupationArea[];
        let _selectData: ISelectData[] = _data.map((e) => {
            return {
                key: e.name!,
                value: e.id
            }
        });
        setOccupationArea(prev => ({
            ...prev!,
            data: _selectData
        }))
    }

    const change = (key: keyof ICourse, value: any) => {
        setData(prev => ({
            ...prev!,
            [key]: value
        }))
    }

    useEffect(() => {
        loadData();
    }, [])

    useEffect(() => {
        onChange!(data);
        setDisabled!(!data?.name || !data.occupationAreaId);
    }, [data]);

    return (
        <section className={styles.content_section} >
            <Input label={t('schoolContent.course.name')} value={data?.name} onChange={(e) => change("name", e.target.value)} maxLength={255} />
            <Select data={occupationAreaSelect?.data ?? []} label={t('schoolContent.course.occupationArea')} onChange={(e) => change("occupationAreaId", Number(e.target.value))} />
        </section>
    )
}