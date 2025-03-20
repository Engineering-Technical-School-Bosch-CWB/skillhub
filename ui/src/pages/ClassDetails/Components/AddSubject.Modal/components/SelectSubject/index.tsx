import Input from "@/components/Input"
import InputSelect, { InputSelectProps } from "@/components/InputSelect"
import { useEffect, useState } from "react"

import styles from "./styles.module.css";
import internalAPI from "@/service/internal.services";
import { toast } from "react-toastify";
import { ICurricularUnit } from "@/interfaces/models/ICurricularUnit";
import { ISelectData } from "@/components/Select/interfaces";
import { ModalContentProps } from "@/pages/ClassDetails/interfaces/ClassDetails.interfaces";
import Button from "@/components/Button";
import Icon from "@/components/Icon";
import { t } from "i18next";

export interface ISelectSubjectProps {
    onChange: (key: string, value: any) => void,
    def?: ModalContentProps,
    onDelete: () => void
}

export default ({onChange, def, onDelete}: ISelectSubjectProps) => {

    const [selectProps, setSelectProps] = useState<InputSelectProps>({
        data: []
    })

    const [filter, setFilter] = useState("")
    const [page] = useState(1);
    const [limit] = useState(0);

    const loadData = async () => {
        const response = await internalAPI.jsonRequest(`/curricularUnits?page=${page}&items=${limit}&query=${filter}`, "GET")
        if(!response || !response.success) 
            toast.error(t('errors.errorLoadCurricularUnit'));
        
        const _data: ISelectData[] = response.data.map((cUnit: ICurricularUnit) => {
            const val: ISelectData = {
                key: cUnit.name,
                value:  cUnit.id, 
                selected: cUnit.name == def?.subject
            }
            return val;
        });
        setSelectProps(prev => ({
            ...prev,
            data: _data
        }))
    }

    const handleSelect = (data: ISelectData) => {
        onChange("subject", data.key);
        onChange("curricularUnitId", data.value);
        setFilter(data.key)
    }

    useEffect(() => {
        loadData()
    },[filter,])

    return (
        <section className={`${styles.grid} ${styles.grid_3cell_2_1}`}>
            <InputSelect data={selectProps.data} onChange={(e) => handleSelect(e)} defaultValue={selectProps.data.find((e) => e.selected)}/> 
            <Input type="number" value={def?.time} onChange={(e) => onChange("time", e.target.value)} />
            <Button kind="danger" variant="rounded" onClick={() => onDelete()}><Icon name="close" /></Button>
        </section>
    )
}