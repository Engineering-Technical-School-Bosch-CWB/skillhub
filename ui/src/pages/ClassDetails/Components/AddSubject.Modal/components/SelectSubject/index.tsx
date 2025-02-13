import Input from "@/components/Input"
import InputSelect, { InputSelectProps } from "@/components/InputSelect"
import { ISubject } from "@/interfaces/models/ISubject"
import { useEffect, useState } from "react"

import styles from "./styles.module.css";
import internalAPI from "@/service/internal.services";
import { toast } from "react-toastify";
import { ICurricularUnit } from "@/interfaces/models/ICurricularUnit";
import { ISelectData } from "@/components/Select/interfaces";
import { ModalContentProps } from "@/pages/ClassDetails/interfaces/ClassDetails.interfaces";
import Button from "@/components/Button";
import Icon from "@/components/Icon";

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
    const [page, setPage] = useState(1);
    const [limit, setLimit] = useState(0);

    const loadData = async () => {
        const response = await internalAPI.jsonRequest(`/curricularUnits?page=${page}&items=${limit}&query=${filter}`, "GET")
        if(!response || !response.success) 
            toast.error("Error on load Curricular Units");
        
        const _data = response.data.map((cUnit: ICurricularUnit) => {
            if(!def){

            }
            return {
                key: cUnit.name,
                value:  cUnit.id
            }
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
            <InputSelect data={selectProps.data} onChange={(e) => handleSelect(e)}/> 
            <Input type="number" value={def?.time} onChange={(e) => onChange("time", e.target.value)} />
            <Button kind="danger" variant="rounded" onClick={() => onDelete()}><Icon name="close" /></Button>
        </section>
    )
}