import { ISelectData } from "@/components/Select/interfaces";
import { ICurricularUnit } from "@/interfaces/models/ICurricularUnit";
import internalAPI from "@/service/internal.services";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";

import styles from '../../../../styles.module.css';
import InputSelect from "@/components/InputSelect";
import Input from "@/components/Input";
import { IAddSubject } from "../../interfaces/AddClassPage.interface";
import Button from "@/components/Button";
import Icon from "@/components/Icon";
import Select from "@/components/Select";

export interface ISubjectSelectProps {
    data?: IAddSubject,
    onSelect: (data: ISelectData) => void,
    onChangeInput?: (value: string) => void,
    onToggleDelete?: () => void
}

export default ({ data, onSelect: onChange, onChangeInput, onToggleDelete }: ISubjectSelectProps) => {
    const [options, setOption] = useState<ISelectData[]>([]);
    const [selected, setSelected] = useState<ISelectData>();

    const loadSubjects = async () => {
        const response = await internalAPI.jsonRequest('/curricularUnits?query', 'GET')
        if (!response.success)
            if (!toast.isActive("subjects-load-error"))
                toast.error("Load subjects error.", { toastId: "subjects-load-error" });


        const _data = response.data as ICurricularUnit[];

        const values: ISelectData[] = _data.map((e) => {
            const _default = data?.curricularUnitId == e.id;

            return {
                key: e.name,
                value: e.id,
                // selected: _default
            }
        })
        setOption(values);
    }

    const checkDefault = () => {
        options.forEach(cUnit => {
            if (cUnit.selected)
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
            <section className={`${styles.dual_input_zone} ${styles.divided_input_3_1}`}>
                <Select data={options} label="Subject" onChange={(e) => onChange({
                    key: options.find(d => d.value == Number(e.target.value))?.key!,
                    value: Number(e.target.value)
                })} />
                <Input label="Duration" value={data?.duration} onChange={(e) => onChangeInput!(e.target.value)} />
                {
                    onToggleDelete &&
                    <Button variant="rounded" kind="danger" onClick={onToggleDelete} > <Icon name="close" /></Button>
                }
            </section>
        </>
    )
}