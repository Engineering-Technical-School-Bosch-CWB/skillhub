import Modal from "@/components/Modal";
import React, { useState } from "react";
import ButtonGroup from "@/components/ButtonGroup";
import internalAPI from "@/service/internal.services";
import { toast } from "react-toastify";
import { ICreateModalProps } from "./_CreateModal.interface";
import { UserPropsType, UserPropsTypeToEndpoint, UserPropsTypeToTitle } from "../../PropertiesTable.interface";
import PositionCreateModal from "./PositionCreateModal";
import SectorCreateModal from "./SectorCreateModal";

const CreationComponents: Record<UserPropsType, React.ElementType> =  {
    position: PositionCreateModal,
    sector: SectorCreateModal
}

export default ({kind, onClose, isOpen}: ICreateModalProps) => {

    const [data, setData] = useState<any>();

    const Component = CreationComponents[kind!]

    const cancel = () => {
        onClose!();
    }

    const submit = async () => {
        const response = await internalAPI.jsonRequest(`/${UserPropsTypeToEndpoint[kind!]}`,"POST", undefined, data)
        
        if(!response || response.statusCode != 201)
            toast.error(`${response.message}`, {toastId:`${kind}-create-error`})
        else
            location.reload();
    }

    return (
        <Modal 
            handleClose={onClose!}
            open={isOpen!}
            title={`Create ${UserPropsTypeToTitle[kind!]}`}
        >
            {Component && <Component onChange={setData} />}
            <ButtonGroup cancel={cancel} submit={submit} />
        </Modal>
    )
}