import Modal from "@/components/Modal";
import ButtonGroup from "@/components/ButtonGroup";
import internalAPI from "@/service/internal.services";
import { toast } from "react-toastify";
import { Tabs } from "../../links";
import React, { useState } from "react";
import CourseUpdateModal from "./CourseUpdateModal";
import CurricularUnitUpdateModal from "./CurricularUnitUpdateModal";
import SubjectAreaUpdateModal from "./SubjectAreaUpdateModal";
import OccupationAreaUpdateModal from "./OccupationAreaUpdateModal";
import { IUpdateModalProps } from "./_UpdateModal.interface";
import toastifyUpdate from "@/constants/toastfyUpdate";
import { t } from "i18next";

const UpdateComponents: Record<Tabs, React.ElementType> = {
    course: CourseUpdateModal,
    curricularUnits: CurricularUnitUpdateModal,
    subjectAreas: SubjectAreaUpdateModal,
    occupationArea: OccupationAreaUpdateModal
}

export default ({ id, kind, onClose, isOpen, onUpdate }: IUpdateModalProps) => {

    const Component = UpdateComponents[kind!]

    const [data, setData] = useState<any>({});
    const [disabled, setDisabled] = useState(true);

    const cancel = () => {
        onClose!();
    }

    const submit = async () => {

        const apiRequest = async () => {
            const response = await internalAPI.jsonRequest(`/${kind}/${id}`, "PATCH", undefined, data)

            if (!response.success)
                throw new Error(response.message);

            return response.data;
        }

        const message = toast.loading("Updating...");

        apiRequest().then(content => {
            toast.update(message, {
                ...toastifyUpdate,
                render: "Updated successfully!",
                type: "success",
            });

            onUpdate!(content);
            onClose!();

        }).catch(err => {
            toast.update(message, {
                ...toastifyUpdate,
                render: err.message || "Something went wrong",
                type: "error",
            });
        })
    }

    return (
        <Modal
            handleClose={onClose!}
            open={isOpen!}
            title={t(`schoolContent.${kind}.update`)}
        >
            {Component && <Component id={id} onChange={setData} setDisabled={setDisabled} />}
            <ButtonGroup cancel={cancel} submit={submit} disabled={disabled} />
        </Modal>

    )
}