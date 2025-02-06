import Modal from "@/components/Modal";
import React, { useState } from "react";
import CourseCreateModal from "./CourseCreateModal";
import SubjectAreaCreateModal from "./SubjectAreaCreateModal";
import CurricularUnitCreateModal from "./CurricularUnitCreateModal";
import { tabName, Tabs } from "../../links";
import OccupationAreaCreateModal from "./OccupationAreaCreateModal";
import ButtonGroup from "@/components/ButtonGroup";
import internalAPI from "@/service/internal.services";
import { toast } from "react-toastify";
import { ICreateModalProps } from "./_CreateModal.interface";

const CreationComponents: Record<Tabs, React.ElementType> =  {
    course: CourseCreateModal,
    curricularUnits: CurricularUnitCreateModal,
    subjectAreas: SubjectAreaCreateModal,
    occupationArea: OccupationAreaCreateModal
}

export default ({kind, onClose, isOpen}: ICreateModalProps) => {

    const [data, setData] = useState<any>();

    const Component = CreationComponents[kind!]

    const cancel = () => {
        onClose!();
    }

    const submit = async () => {
        const response = await internalAPI.jsonRequest(`/${kind}`,"POST", undefined, data)
        
        if(!response || response.statusCode != 201)
            toast.error(`Error on create ${tabName[kind!]}`, {toastId:`${kind}-create-error`})
        else
            location.reload();
    }

    return (
        <Modal 
            handleClose={onClose!}
            open={isOpen!}
            title={`Create ${tabName[kind!]}`}
        >
            {Component && <Component onChange={setData} />}
            <ButtonGroup cancel={cancel} submit={submit} />
        </Modal>
    )
}