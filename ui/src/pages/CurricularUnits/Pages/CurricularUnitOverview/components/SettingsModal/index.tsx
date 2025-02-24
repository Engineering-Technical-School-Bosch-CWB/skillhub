import Input from "@/components/Input"
import Modal, { IModalProps } from "@/components/Modal"
import Select from "@/components/Select"
import { ISelectData } from "@/components/Select/interfaces"
import { ICurricularUnit } from "@/interfaces/models/ICurricularUnit"
import internalAPI from "@/service/internal.services"
import { useEffect, useState } from "react"
import { toast } from "react-toastify"

interface ISettingsModalProps extends IModalProps {
    data: ICurricularUnit
}

import styles from "./styles.module.css"
import ButtonGroup from "@/components/ButtonGroup"

export default ({handleClose, open, data}: ISettingsModalProps) => {

    const [currentData, setCurrentData] = useState<ICurricularUnit>(data);
    const [subjectAreasSelect, setSubjectAreasSelect] = useState<ISelectData[]>([]);

    const changeData = (key: string, value: any) => {
        setCurrentData(prev => ({
            ...prev,
            [key]: value
        }))
    }

    const loadSubjectAreas = async () => {
        const response = await internalAPI.jsonRequest(`/subjectAreas?page=1&limit=0`, "GET");
        if(!response || !response.success)
            toast.error("Error on load subject areas", {toastId: "subject-areas-error-load"});
        
        const _data = response.data as ICurricularUnit[];
        
        setSubjectAreasSelect(_data.map((s) => {
            return {
                key: s.name,
                value: s.id,
                selected: s.id == data.subjectArea?.id
            }
        }))
    }

    const submit = async () => {
        const response = await internalAPI.jsonRequest(`/curricularUnits/${data.id}`, "PATCH", undefined, currentData)
        if(!response || !response.success){
            toast.error(`Error on update Curricular Unit ${response.message}`, {toastId: "curricular-unit-update-error"});
            return
        }

        location.reload();
        
    }

    useEffect(() => {
        loadSubjectAreas()
        setCurrentData({
            name: data.name,
            subjectAreaId: data.subjectArea?.id ?? 0,
            id: data.id
        })
    }, [data])

    return (
        <Modal
            handleClose={handleClose}
            open={open}
            title="Curricular Unit Settings"

        >
            <div className={styles.modal_content}>

                <Input value={currentData.name} label="Name" onChange={(e) => changeData("name", e.target.value)}/>
                <Select 
                    label="Subject Area"
                    data={subjectAreasSelect}
                    hasDefault={true}

                    onChange={(e) => changeData("subjectAreaId", e.target.value)}
                />

                <ButtonGroup cancel={handleClose} submit={submit} />
            </div>
        </Modal>
    )
}