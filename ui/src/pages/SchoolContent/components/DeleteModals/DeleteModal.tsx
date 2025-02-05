import Modal from "@/components/Modal";
import { IDeleteModalProps } from "./DeleteModal.interface";
import Text from "@/typography";
import React, { useState } from "react";
import CourseDeleteModal from "./CourseDeleteModal";
import SubjectAreaDeleteModal from "./SubjectAreaDeleteModal";
import CurricularUnitDeleteModal from "./CurricularUnitDeleteModal";
import { Tabs } from "../../links";
import OccupationAreaDeleteModal from "./OccupationAreaDeleteModal";
import ButtonGroup from "@/components/ButtonGroup";
import internalAPI from "@/service/internal.services";
import { toast } from "react-toastify";

const DeleteComponents: Record<Tabs, React.ElementType> =  {
    course: CourseDeleteModal,
    curricularUnits: CurricularUnitDeleteModal,
    subjectAreas: SubjectAreaDeleteModal,
    occupationAreas: OccupationAreaDeleteModal
}

export default ({id, kind, onClose, isOpen}: IDeleteModalProps) => {

    const Component = DeleteComponents[kind!]

    const cancel = () => {
        onClose!();
    }

    const submit = async () => {
        const response = await internalAPI.jsonRequest(`/${kind}/${id}`,"DELETE")
        console.log(response);
        
        if(!response || response.statusCode != 200)
            toast.error(`Error on delete ${kind}`, {toastId:`${kind}-delete-error`})
        else
            location.reload();
    }

    return (
        <Modal 
            handleClose={onClose!}
            open={isOpen!}
            title={"Are you sure you want to delete this item?"}
        >
            {Component && <Component id={id}/>}
            <ButtonGroup cancel={cancel} submit={submit} />
        </Modal>
    )
}