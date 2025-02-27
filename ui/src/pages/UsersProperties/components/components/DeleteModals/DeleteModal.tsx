import Modal from "@/components/Modal";
import { IDeleteModalProps } from "./_DeleteModal.interface";
import React, { useState } from "react";
import ButtonGroup from "@/components/ButtonGroup";
import internalAPI from "@/service/internal.services";
import { toast } from "react-toastify";
import { UserPropsType, UserPropsTypeToEndpoint } from "../../PropertiesTable.interface";
import PositionDeleteModal from "./PositionDeleteModal";
import SectorDeleteModal from "./SectorDeleteModal";

const DeleteComponents: Record<UserPropsType, React.ElementType> =  {
    position: PositionDeleteModal,
    sector: SectorDeleteModal
}

export default ({id, kind, onClose, isOpen}: IDeleteModalProps) => {

    const Component = DeleteComponents[kind!]

    const cancel = () => {
        onClose!();
    }

    const submit = async () => {
        const response = await internalAPI.jsonRequest(`/${UserPropsTypeToEndpoint[kind!]}/${id}`,"DELETE")
        
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