import Input from "@/components/Input"
import Modal, { IModalProps } from "@/components/Modal"
import Select from "@/components/Select"
import { ISelectData } from "@/components/Select/interfaces"
import { ICurricularUnit } from "@/interfaces/models/ICurricularUnit"
import internalAPI from "@/service/internal.services"
import { useEffect, useState } from "react"
import { toast } from "react-toastify"

interface ISettingsModalProps extends IModalProps {
    data: ICurricularUnit
    ucState: IState<ICurricularUnit>
}

import styles from "./styles.module.css"
import ButtonGroup from "@/components/ButtonGroup"
import { IState } from "@/interfaces/IState.interface"
import toastifyUpdate from "@/constants/toastfyUpdate"
import { t } from "i18next"
import Button from "@/components/Button"
import Text from "@/typography"
import { confirmDialog } from "@/components/ConfirmDialog"
import { useNavigate } from "react-router-dom"

export default ({ handleClose, open, data, ucState }: ISettingsModalProps) => {
    const navigation = useNavigate();
    const [currentData, setCurrentData] = useState<ICurricularUnit>(data);
    const [subjectAreasSelect, setSubjectAreasSelect] = useState<ISelectData[]>([]);

    const changeData = (key: string, value: any) => {
        setCurrentData(prev => ({
            ...prev,
            [key]: value
        }))
    }

    const loadSubjectAreas = async () => {
        const response = await internalAPI.jsonRequest(`/subjectAreas?page=1&limit=0`, "GET");
        if (!response || !response.success)
            toast.error("Error on load subject areas", { toastId: "subject-areas-error-load" });

        const _data = response.data as ICurricularUnit[];

        setSubjectAreasSelect(_data.map((s) => {
            return {
                key: s.name,
                value: s.id,
                selected: s.id == data.subjectArea?.id
            }
        }))
    }

    const submit = async () => {

        const apiRequest = async () => {
            const response = await internalAPI.jsonRequest(`/curricularUnits/${data.id}`, "PATCH", undefined, currentData)
            if (!response || !response.success)
                throw new Error(response.message);
            // toast.error(`Error on update Curricular Unit ${response.message}`, {toastId: "curricular-unit-update-error"});
            return response.data;
        }

        const message = toast.loading("Updating curricular unit!");
        apiRequest().then(content => {

            console.log(content)

            toast.update(message, {
                ...toastifyUpdate,
                render: "Curricular unit updated successfully!",
                type: "success"
            });

            ucState.setValue({ ...ucState.value, name: content.name, subjectArea: content.subjectArea });
        }).catch(err => {
            toast.update(message, {
                ...toastifyUpdate,
                render: err.message || "Something went wrong.",
                type: "error"
            });
        }).finally(() => {
            handleClose();
        })

    }

    const onToggleDelete = async () => {
        var confirm = await confirmDialog(t('curricularUnits.modal.confirmDelete'));
        if(!confirm)
            return;

        const apiRequest = async () => {
            const response = await internalAPI.jsonRequest(`/curricularUnits/${data.id}`, "DELETE")
            if (!response || !response.success)
                throw new Error(response.message);
            return response.data;
        }

        const message = toast.loading(t('curricularUnits.modal.deleting'));
        apiRequest().then(_ => {
            toast.update(message, {
                ...toastifyUpdate,
                render: t('curricularUnits.modal.deleted'),
                type: "success"
            });
            
            navigation('/curricular-units')
        }).catch(err => {
            toast.update(message, {
                ...toastifyUpdate,
                render: err.message || "Something went wrong.",
                type: "error"
            });
        }).finally(() => {
            handleClose();
        })
    }

    useEffect(() => {
        loadSubjectAreas()
        setCurrentData({
            name: data.name,
            subjectAreaId: data.subjectArea?.id ?? 0,
            id: data.id
        })
    }, [data])

    return (
        <Modal
            handleClose={handleClose}
            open={open}
            title={t('curricularUnits.settings.title')}

        >
            <div className={styles.modal_content}>
                <Input value={currentData.name} label={t('curricularUnits.name')} onChange={(e) => changeData("name", e.target.value)} />
                <Select
                    label={t('curricularUnits.subjectArea')}
                    data={subjectAreasSelect}
                    hasDefault={true}

                    onChange={(e) => changeData("subjectAreaId", e.target.value)}
                />
                <section className={styles.btn_area}>
                    <Button kind="danger" onClick={() => onToggleDelete()}>
                        <Text>{t('buttons.delete')}</Text>
                    </Button>
                    <ButtonGroup cancel={handleClose} submit={submit} />
                </section>
            </div>
        </Modal>
    )
}