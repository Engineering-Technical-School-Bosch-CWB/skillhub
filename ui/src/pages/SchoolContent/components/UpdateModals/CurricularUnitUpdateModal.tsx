import internalAPI from "@/service/internal.services";
import { IUpdateModalProps } from "./_UpdateModal.interface"
import styles from './styles.module.css';
import { useEffect, useState } from "react";
import { CurricularUnit } from "@/interfaces/models/ICurricularUnit";
import { toast } from "react-toastify";
import Input from "@/components/Input";
import Select from "@/components/Select";
import { ISelectData, ISelectProps } from "@/components/Select/interfaces";
import { SubjectArea } from "@/interfaces/models/ISubjectArea";

export default ({ id, onChange, setDisabled }: IUpdateModalProps) => {

    const [data, setData] = useState<CurricularUnit>();
    const [subjectAreaSelect, setsubjectAreaSelect] = useState<ISelectProps>();
    const getData = async () => {
        let response = await internalAPI.jsonRequest(`/curricularUnits/${id}`, "GET")
        if (!response || response.statusCode != 200)
            toast.error(`Error on load object`, { toastId: "curricular-unit-load-error" });

        setData(response.data as CurricularUnit);

        response = await internalAPI.jsonRequest(`/subjectAreas`, "GET");
        let subjectAreas = response.data as SubjectArea[]
        let _select: ISelectData[] = subjectAreas.map((e) => {
            return {
                key: e.name,
                value: e.id
            }
        })
        setsubjectAreaSelect(prev => ({
            ...prev,
            data: _select
        }))
    }

    useEffect(() => {
        getData();
    }, [])

    const change = (key: keyof CurricularUnit, value: any) => {
        setData(prev => ({
            ...prev!,
            [key]: value
        }))
    }

    useEffect(() => {
        onChange!(data);
        setDisabled!(!data?.name || !data?.subjectAreaId);

        console.log(data);
        console.log(!data?.name || !data?.subjectAreaId)
    }, [data])

    return (
        <section className={styles.content_section}>
            <Input label="Name" value={data?.name} onChange={(e) => change("name", e.target.value)} maxLength={50} />
            <Select data={subjectAreaSelect?.data ?? []} label="Subject Area" onChange={(e) => change("subjectAreaId", e.target.value)} />
        </section>
    )
}