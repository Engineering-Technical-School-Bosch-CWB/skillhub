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
import toastifyUpdate from "@/constants/toastfyUpdate";
import { t } from "i18next";

const CreationComponents: Record<Tabs, React.ElementType> = {
    course: CourseCreateModal,
    curricularUnits: CurricularUnitCreateModal,
    subjectAreas: SubjectAreaCreateModal,
    occupationArea: OccupationAreaCreateModal
}

export default ({ kind, onClose, isOpen, onCreate }: ICreateModalProps) => {

    const [data, setData] = useState<any>();
    const [disabled, setDisabled] = useState(true);

    const Component = CreationComponents[kind!]

    const cancel = () => {
        if (onClose)
            onClose();
    }

    const submit = async () => {

        const apiRequest = async () => {
            const response = await internalAPI.jsonRequest(`/${kind}`, "POST", undefined, data)

            if (!response.success)
                throw new Error(response.message);

            return response.data;
        }

        const message = toast.loading("Creating...");

        apiRequest().then(content => {
            toast.update(message, {
                ...toastifyUpdate,
                render: "Created successfully!",
                type: "success",
            });
            
            if (onCreate)
                onCreate(content);

            if (onClose)
                onClose();            
        }).catch(err => {
            toast.update(message, {
                ...toastifyUpdate,
            render: err.message || "Something went wrong.",
                type: "error",
            });
        })
    }

    return (
        <Modal
            handleClose={onClose!}
            open={isOpen!}
            title={t(`schoolContent.${kind}.create`)}
        >
            {Component && <Component onChange={setData} setDisabled={setDisabled} />}
            <ButtonGroup cancel={cancel} submit={submit} disabled={disabled} />
        </Modal>
    )
}