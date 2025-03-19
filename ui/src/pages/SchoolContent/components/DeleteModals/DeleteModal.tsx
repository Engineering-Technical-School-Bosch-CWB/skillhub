import Modal from "@/components/Modal";
import { IDeleteModalProps } from "./_DeleteModal.interface";
import React from "react";
import CourseDeleteModal from "./CourseDeleteModal";
import SubjectAreaDeleteModal from "./SubjectAreaDeleteModal";
import CurricularUnitDeleteModal from "./CurricularUnitDeleteModal";
import { Tabs } from "../../links";
import OccupationAreaDeleteModal from "./OccupationAreaDeleteModal";
import ButtonGroup from "@/components/ButtonGroup";
import internalAPI from "@/service/internal.services";
import { toast } from "react-toastify";
import toastifyUpdate from "@/constants/toastfyUpdate";
import { t } from "i18next";

const DeleteComponents: Record<Tabs, React.ElementType> = {
    course: CourseDeleteModal,
    curricularUnits: CurricularUnitDeleteModal,
    subjectAreas: SubjectAreaDeleteModal,
    occupationArea: OccupationAreaDeleteModal
}

export default ({ id, kind, onClose, isOpen, onDelete }: IDeleteModalProps) => {

    const Component = DeleteComponents[kind!]

    const cancel = () => {
        onClose!();
    }

    const submit = async () => {

        const apiRequest = async () => {
            const response = await internalAPI.jsonRequest(`/${kind}/${id}`, "DELETE")

            if (!response.success)
                throw new Error(response.message);
        }

        const message = toast.loading("Deleting...");

        apiRequest().then(() => {
            toast.update(message, {
                ...toastifyUpdate,
                render: "Deleted successfully!",
                type: "success",
            });

            onDelete!(id);
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
        title={t('schoolContent.delete')}
    >
        {Component && <Component id={id} />}
        <ButtonGroup cancel={cancel} submit={submit} />
    </Modal>
)
}