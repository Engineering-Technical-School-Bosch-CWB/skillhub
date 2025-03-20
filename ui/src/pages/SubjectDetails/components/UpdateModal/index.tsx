import Modal from "@/components/Modal";
import styles from "./styles.module.css";
import Button from "@/components/Button";
import Input from "@/components/Input";
import Select from "@/components/Select";
import internalAPI from "@/service/internal.services";
import Progress from "@/components/Progress";
import { formatDate } from "@/constants/formatDate";
import toastifyUpdate from "@/constants/toastfyUpdate";

import { toast } from "react-toastify";
import { useNavigate, useParams } from "react-router-dom";
import { ISelectData } from "@/components/Select/interfaces";
import { useEffect, useState } from "react";
import { ISubject } from "@/interfaces/models/ISubject";
import { t } from 'i18next';

interface IModalProps {
    isOpen: boolean
    handleIsOpen: Function
    subject: ISubject
    setSubject: Function
}

interface IUpdateSubjectPayload {
    durationHours?: number
    period?: number
    beganAt?: string
    instructorId?: number
}

export default ({ isOpen, handleIsOpen, subject, setSubject }: IModalProps) => {

    const [loading, setLoading] = useState(true);

    const navigate = useNavigate();

    const { classId, subjectId } = useParams();

    const [teachers, setTeachers] = useState<ISelectData[]>([]);
    const [payload, setPayload] = useState<IUpdateSubjectPayload>(subject);

    const getData = async () => {
        const response = await internalAPI.jsonRequest(`/users/teachers?${new URLSearchParams({ subjectId: subjectId! })}`, "GET");
        setTeachers(response.data.map((t: { name: string; id: number; }) => ({
            key: t.name,
            value: t.id
        })));

        setLoading(false);
    }

    const handleSubmit = async () => {

        const apiRequest = async () => {
            const response = await internalAPI.jsonRequest(`/subjects/${subjectId}`, "PATCH", undefined, payload);

            if (!response.success)
                throw new Error(response.message);

            return response.data;
        }

        const message = toast.loading(t('subjectDetails.updateModal.updatingSubject'));
        apiRequest().then(content => {
            toast.update(message, {
                ...toastifyUpdate,
                render: t('subjectDetails.updateModal.feedbackUpdated'),
                type: "success"
            });

            setSubject({
                ...subject,
                ...content
            })

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

    const handleDelete = () => {
        if (!confirm(t('subjectDetails.updateModal.confirmDelete')))
            return;

        const apiRequest = async () => {
            await internalAPI.jsonRequest(`/subjects/${subjectId}`, "DELETE");
        }

        const message = toast.loading(t('subjectDetails.updateModal.updatingSubject'));
        apiRequest().then(() => {
            toast.update(message, {
                ...toastifyUpdate,
                render: `${subject.curricularUnit} ${t('subjectDetails.updateModal.deletedSuccessfully')}`,
                type: "success"
            });
        }).catch(err => {
            toast.update(message, {
                ...toastifyUpdate,
                render: err.message || `${t('subjectDetails.updateModal.unableDelete')} ${subject.curricularUnit}`,
                type: "error"
            });
        }).finally(() => {
            navigate(`/classes/${classId}`);
        })
    }

    const handleClose = () => {
        handleIsOpen();
    }

    useEffect(() => {
        getData();
    }, [])

    useEffect(() => {
        setPayload(subject);
    }, [isOpen]);

    if (loading)
        return (
            <Modal open={isOpen} handleClose={handleClose} title={`${subject.curricularUnit} - ${subject.class}`} >
                <div className={`${styles.center}`}>
                    <Progress component={true} />
                </div>
            </Modal>
        )

    return (
        <>
            <Modal open={isOpen} handleClose={handleClose} title={`${subject.curricularUnit} - ${subject.class}`} >
                <div className={`${styles.inputs}`}>
                    <div className={`${styles.section}`}>
                        <Input onChange={(e) => setPayload({ ...payload, durationHours: Number(e.target.value) })} label={t('subjectDetails.updateModal.durationHours')} width={"35%"} value={payload.durationHours} type="number" min={0} />
                        <Input onChange={(e) => setPayload({ ...payload, period: Number(e.target.value) })} label={t('subjectDetails.updateModal.period')} width={"20%"} value={payload.period} type="number" min={0} max={50} />
                        <Input dateChange={(e) => setPayload({ ...payload, beganAt: e?.format("YYYY-MM-DD") })} label={t('subjectDetails.updateModal.initialDate')} width={"45%"} value={payload.beganAt ? formatDate(payload.beganAt) : undefined} type="date" />
                    </div>
                    <Select
                        label={t('subjectDetails.updateModal.responsibleTeacher')}
                        data={teachers}
                        hasDefault={payload?.instructorId != null}
                        onChange={(e) => setPayload({ ...payload, instructorId: Number(e.target.value) })}
                    />
                    <br />
                    <div className={`${styles.bttns}`}>
                        <Button kind="danger" className={`${styles.flex_start}`} onClick={handleDelete}>{t('subjectDetails.updateModal.Delete')}</Button>
                        <Button onClick={handleClose}>{t('subjectDetails.updateModal.Cancel')}</Button>
                        <Button variant="contained" onClick={handleSubmit}>{t('subjectDetails.updateModal.Confirm')}</Button>
                    </div>
                </div>
            </Modal>
        </>
    )
}