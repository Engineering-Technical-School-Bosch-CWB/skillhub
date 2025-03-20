import Modal from "@/components/Modal";
import styles from "./styles.module.css";
import Button from "@/components/Button";
import Input from "@/components/Input";
import internalAPI from "@/service/internal.services";
import toastifyUpdate from "@/constants/toastfyUpdate";

import { toast } from "react-toastify";
import { useNavigate, useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { IClass } from "../../interfaces/ClassDetails.interfaces";
import { t } from "i18next";

interface IModalProps {
    isOpen: boolean
    handleIsOpen: Function
    _class: IClass
    setClass: Function
}


export default ({ isOpen, handleIsOpen, _class, setClass }: IModalProps) => {

    const navigate = useNavigate();

    const { classId } = useParams();

    const [payload, setPayload] = useState<IClass>(_class);

    const handleSubmit = async () => {

        const apiRequest = async () => {
            const response = await internalAPI.jsonRequest(`/classes/${classId}`, "PATCH", undefined, payload);

            if (!response.success)
                throw new Error(response.message);

            return response.data;
        }

        const message = toast.loading(t('classDetails.updateModal.updatingClass'));
        apiRequest().then(content => {

            toast.update(message, {
                ...toastifyUpdate,
                render: t('classDetails.updateModal.successfullyUpdated'),
                type: "success"
            });

            setClass({
                ..._class,
                ...content
            })

            console.log(content);
        }).catch(err => {
            toast.update(message, {
                ...toastifyUpdate,
                render: err.message || t('errors.somethingWentWrong'),
                type: "error"
            });
        }).finally(() => {
            handleClose();
        })
    }

    const handleDelete = () => {
        if (!confirm(`${t('classDetails.updateModal.deleteMessage')} ${_class.name} - ${_class.startingYear}?`))
            return

        const apiRequest = async () => 
            await internalAPI.jsonRequest(`/classes/${classId}`, "DELETE");

        const message = toast.loading(t('classDetails.updateModal.deleting'));
        apiRequest().then(() => {
            toast.update(message, {
                ...toastifyUpdate,
                render: `${_class.name + " - " + _class.startingYear} ${t('classDetails.updateModal.successfullyDeleted')}`,
                type: "success"
            });

            navigate(`/classes`);
        }).catch(err => {
            toast.update(message, {
                ...toastifyUpdate,
                render: err.message || `${t('classDetails.updateModal.unableDelete')} ${_class.name + " - " + _class.startingYear}`,
                type: "error"
            });

            handleClose();
        })
    }

    const handleArchive = () => {
        if (!confirm(`${t('classDetails.updateModal.archiveMessage')} ${_class.name} - ${_class.startingYear}?`))
            return

        const apiRequest = async () => 
            await internalAPI.jsonRequest(`/classes/archive/${classId}`, "PATCH");

        const message = toast.loading(t('classDetails.updateModal.archiving'));
        apiRequest().then(() => {
            toast.update(message, {
                ...toastifyUpdate,
                render: `${_class.name + " - " + _class.startingYear} ${t('classDetails.updateModal.successfullyArchived')}`,
                type: "success"
            });

            navigate(`/classes`);
        }).catch(err => {
            toast.update(message, {
                ...toastifyUpdate,
                render: err.message || `${t('classDetails.updateModal.unableArchive')} ${_class.name + " - " + _class.startingYear}`,
                type: "error"
            });

            handleClose();
        })
    }

    const handleUnarchive = () => {
        if (!confirm(`${t('classDetails.updateModal.unarchiveMessage')} ${_class.name} - ${_class.startingYear}?`))
            return
        
        const apiRequest = async () => 
            await internalAPI.jsonRequest(`/classes/unarchive/${classId}`, "PATCH");

        const message = toast.loading(t('classDetails.updateModal.unarchiving'));
        apiRequest().then(() => {
            toast.update(message, {
                ...toastifyUpdate,
                render: `${_class.name + " - " + _class.startingYear} ${t('classDetails.updateModal.successfullyUnarchived')}`,
                type: "success"
            });

            navigate(`/classes`);
        }).catch(err => {
            toast.update(message, {
                ...toastifyUpdate,
                render: err.message || `${t('classDetails.updateModal.unableUnarchive')} ${_class.name + " - " + _class.startingYear}`,
                type: "error"
            });

            handleClose();
        })
    }

    const handleClose = () => {
        handleIsOpen();
    }

    useEffect(() => {
        setPayload(_class);
    }, [isOpen])

    return (
        <>
            <Modal open={isOpen} handleClose={handleClose} title={_class.name} >
                <div className={`${styles.inputs}`}>
                    <Input onChange={(e) => setPayload({ ...payload, name: e.target.value })} label={t('classDetails.updateModal.className')} value={payload.name} maxLength={255} />
                    <div className={`${styles.section}`}>
                        <Input onChange={(e) => setPayload({ ...payload, abbreviation: e.target.value })} label={t('classDetails.updateModal.abbreviation')} width={"calc(100%/3)"} value={payload.abbreviation} maxLength={10} />
                        <Input onChange={(e) => setPayload({ ...payload, durationPeriods: Number(e.target.value) })} label={t('classDetails.updateModal.periods')} width={"calc(100%/3)"} value={payload.durationPeriods} type="number" min={0} max={50} />
                        <Input onChange={(e) => setPayload({ ...payload, startingYear: Number(e.target.value) })} label={t('classDetails.updateModal.startingYear')} width={"calc(100%/3)"} value={payload.startingYear} type="number" min={1980} max={2200} />
                    </div>

                    <br />
                    <div className={`${styles.bttns}`}>
                        <div className={`${styles.bttns} ${styles.flex_start}`}>
                            <div className={`${styles.not} ${styles.tooltip}`}>
                                <Button kind="danger" onClick={handleDelete}>{t('buttons.delete')}</Button>
                                <span className={`${styles.tooltiptext}`}>{t('classDetails.updateModal.deleteAlert')}</span>
                            </div>
                            {
                                _class.isArchived &&
                                <div className={`${styles.not} ${styles.tooltip}`}>
                                    <Button kind="alert" onClick={handleUnarchive}>{t('buttons.unarchive')}</Button>
                                </div>
                            }
                            {
                                !_class.isArchived &&
                                <div className={`${styles.not} ${styles.tooltip}`}>
                                    <Button kind="alert" onClick={handleArchive}>{t('buttons.archive')}</Button>
                                    <span className={`${styles.tooltiptext}`} style={{ width: "180px" }}>{t('classDetails.updateModal.archiveAlert')}</span>
                                </div>
                            }
                        </div>
                        <Button onClick={handleClose}>{t('buttons.cancel')}</Button>
                        <Button variant="contained" onClick={handleSubmit}>{t('buttons.confirm')}</Button>
                    </div>
                </div>
            </Modal>
        </>
    )
}