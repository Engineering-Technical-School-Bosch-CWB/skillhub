import Modal from "@/components/Modal";
import ButtonGroup from "@/components/ButtonGroup";
import internalAPI from "@/service/internal.services";
import { toast } from "react-toastify";
import { tabName, Tabs } from "../../links";
import React, { useState } from "react";
import CourseUpdateModal from "./CourseUpdateModal";
import CurricularUnitUpdateModal from "./CurricularUnitUpdateModal";
import SubjectAreaUpdateModal from "./SubjectAreaUpdateModal";
import OccupationAreaUpdateModal from "./OccupationAreaUpdateModal";
import { IUpdateModalProps } from "./_UpdateModal.interface";

const UpdateComponents: Record<Tabs, React.ElementType> = {
    course: CourseUpdateModal,
    curricularUnits: CurricularUnitUpdateModal,
    subjectAreas: SubjectAreaUpdateModal,
    occupationArea: OccupationAreaUpdateModal
}

export default ({id, kind, onClose, isOpen}: IUpdateModalProps) => {

    const Component = UpdateComponents[kind!]

    const [data, setData] = useState<any>({});

    const cancel = () => {
        onClose!();
    }

    const submit = async () => {
        const response = await internalAPI.jsonRequest(`/${kind}/${id}`,"PATCH",undefined, data)
        
        if(!response || response.statusCode != 200)
            toast.error(`Error on delete ${kind}`, {toastId:`${kind}-update-error`})
        else
            location.reload();
    }

    return (
        <Modal 
            handleClose={onClose!}
            open={isOpen!}
            title={`Update ${tabName[kind!]}`}
        >
            {Component && <Component id={id} onChange={setData} />}
            <ButtonGroup cancel={cancel} submit={submit} />
        </Modal>
        
    )
}