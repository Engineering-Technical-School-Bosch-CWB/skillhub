import { ISelectData } from "@/components/Select/interfaces";
import { ICurricularUnit } from "@/interfaces/models/ICurricularUnit";
import internalAPI from "@/service/internal.services";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";

import styles from '../../../../styles.module.css';
import InputSelect from "@/components/InputSelect";
import Input from "@/components/Input";
import { IAddSubject } from "../../interfaces/AddClassPage.interface";

export interface ISubjectSelectProps {
    data?: IAddSubject,
    onSelect: (data: ISelectData) => void,
    onChangeInput?: (value: string) => void
}

export default ({data, onSelect: onChange, onChangeInput}: ISubjectSelectProps) => {
    const [options, setOption] = useState<ISelectData[]>([]);
    const [selected, setSelected] = useState<ISelectData>();

    const loadSubjects = async () => {
        const response = await internalAPI.jsonRequest('/curricularUnits?query', 'GET')
        if(!response || response.statusCode != 200)
            if (!toast.isActive("subjects-load-error"))
                toast.error("Load subjects error.", { toastId: "subjects-load-error" });


        const _data = response.data as ICurricularUnit[];
        
        const values: ISelectData[] = _data.map((e) => {
            const _default = data?.curricularUnitId == e.id;

            return {
                key: e.name,
                value: e.id,
                selected: _default
            }
        })
        setOption(values);
    }

    const checkDefault = () => {
        options.forEach(cUnit => {
            if(cUnit.selected)
                setSelected(cUnit)
        });
    }

    useEffect(() => {
        loadSubjects();
    }, [])
    useEffect(() => {
        checkDefault();
    }, [options])

    return (
        <>
            <section className={`${styles.dual_input_zone} ${styles.divided_input_2_1}`}>
                <InputSelect data={options} label="Subject" defaultValue={selected} onChange={onChange} /> 
                <Input label="Duration" value={data?.duration} onChange={(e) => onChangeInput!(e.target.value)}/>
            </section>
        </>
    )
}