import Modal from "@/components/Modal";
import ButtonGroup from "@/components/ButtonGroup";
import internalAPI from "@/service/internal.services";
import { toast } from "react-toastify";
import React, { useState } from "react";
import { IUpdateModalProps } from "./_UpdateModal.interface";
import { UserPropsType, UserPropsTypeToEndpoint, UserPropsTypeToTitle } from "../../PropertiesTable.interface";
import PositionUpdateModal from "./PositionUpdateModal";
import SectorUpdateModal from "./SectorUpdateModal";

const UpdateComponents: Record<UserPropsType, React.ElementType> = {
    position: PositionUpdateModal,
    sector: SectorUpdateModal
}

export default ({id, kind, onClose, isOpen}: IUpdateModalProps) => {

    const Component = UpdateComponents[kind!]

    const [data, setData] = useState<any>({});

    const cancel = () => {
        onClose!();
    }

    const submit = async () => {
        const response = await internalAPI.jsonRequest(`/${UserPropsTypeToEndpoint[kind!]}/${id}`,"PATCH",undefined, data)
        
        if(!response || response.statusCode != 200)
            toast.error(`Error on delete ${UserPropsTypeToTitle[kind!]}`, {toastId:`${kind}-update-error`})
        else
            location.reload();
    }

    return (
        <Modal 
            handleClose={onClose!}
            open={isOpen!}
            title={`Update ${UserPropsTypeToTitle[kind!]}`}
        >
            {Component && <Component id={id} onChange={setData} />}
            <ButtonGroup cancel={cancel} submit={submit} />
        </Modal>
        
    )
}