import { useEffect, useState } from "react"
import { ICreateModalProps } from "./_CreateModal.interface"
import internalAPI from "@/service/internal.services";
import { toast } from "react-toastify";
import { ISelectData, ISelectProps } from "@/components/Select/interfaces";
import { SubjectArea } from "@/interfaces/models/ISubjectArea";
import Input from "@/components/Input";
import Select from "@/components/Select";
import { CurricularUnit } from "@/interfaces/models/ICurricularUnit";

import styles from '../DeleteModals/styles.module.css'
import { t } from "i18next";

export default ({ onChange, setDisabled }: ICreateModalProps) => {

    const [data, setData] = useState<CurricularUnit>();
    const [subjectAreasSelect, setSubjectAreasSelect] = useState<ISelectProps>();

    const loadSubjectAreas = async () => {
        const response = await internalAPI.jsonRequest(`/subjectAreas?page=1&items=100`, "GET");
        if (!response || response.statusCode != 200)
            toast.error("Error on load subject areas", { toastId: "subject-areas-load-error" })
        const subjectAreas = response.data as SubjectArea[];
        const selectData: ISelectData[] = subjectAreas.map((e) => {
            return {
                key: e.name,
                value: e.id
            }
        })
        setSubjectAreasSelect(prev => ({
            ...prev,
            data: selectData
        }))
    }

    const change = (key: keyof CurricularUnit, value: any) => {
        setData(prev => ({
            ...prev!,
            [key]: value
        }))
    }

    useEffect(() => {
        onChange!(data);
        setDisabled!(!data?.name || !data?.subjectAreaId);
    }, [data]);
    
    useEffect(() => {
        loadSubjectAreas();
    }, []);

    return (
        <section className={styles.content_section}>
            <Input label={t('schoolContent.curricularUnits.name')} value={data?.name} onChange={(e) => change("name", e.target.value)} maxLength={50} />
            <Select data={subjectAreasSelect?.data ?? []} label={t('schoolContent.curricularUnits.subjectArea')} onChange={(e) => change("subjectAreaId", e.target.value)} />
        </section>
    )
}