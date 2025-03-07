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

const CreationComponents: Record<Tabs, React.ElementType> = {
    course: CourseCreateModal,
    curricularUnits: CurricularUnitCreateModal,
    subjectAreas: SubjectAreaCreateModal,
    occupationArea: OccupationAreaCreateModal
}

export default ({ kind, onClose, isOpen }: ICreateModalProps) => {

    const [data, setData] = useState<any>();
    const [disabled, setDisabled] = useState(true);

    const Component = CreationComponents[kind!]

    const cancel = () => {
        onClose!();
    }

    const submit = async () => {

        const apiRequest = async () => {
            const response = await internalAPI.jsonRequest(`/${kind}`, "POST", undefined, data)

            if (!response.success)
                throw new Error(response.message);

            return response.data;
        }

        const message = toast.loading("Creating...");

        apiRequest().then(() => {
            toast.update(message, {
                ...toastifyUpdate,
                render: "Created successfully!",
                type: "success",
            });
        }).catch(err => {
            toast.update(message, {
                ...toastifyUpdate,
                render: err.message || `Error on create ${tabName[kind!]}`,
                type: "error",
            });
        }).finally(() => location.reload());
    }

    return (
        <Modal
            handleClose={onClose!}
            open={isOpen!}
            title={`Create ${tabName[kind!]}`}
        >
            {Component && <Component onChange={setData} setDisabled={setDisabled} />}
            <ButtonGroup cancel={cancel} submit={submit} disabled={disabled} />
        </Modal>
    )
}