import Modal from "@/components/Modal";
import styles from "./styles.module.css";
import Button from "@/components/Button";
import Input from "@/components/Input";
import Select from "@/components/Select";
import internalAPI from "@/service/internal.services";
import Progress from "@/components/Progress";
import formatDate from "@/constants/formatDate";
import toastifyUpdate from "@/constants/toastfyUpdate";

import { toast } from "react-toastify";
import { useNavigate, useParams } from "react-router-dom";
import { ISelectData } from "@/components/Select/interfaces";
import { useEffect, useState } from "react";
import { IExam } from "@/interfaces/models/IExam";
import TextArea from "@/components/TextArea";
import { height } from "@mui/system";

interface IModalProps {
    isOpen: boolean
    handleIsOpen: Function
    exam: IExam
    setExam: Function
}

interface IUpdateExamPayload {
    name?: string
    description?: string
    appliedAt?: string
    instructorId?: number
}

export default ({ isOpen, handleIsOpen, exam, setExam }: IModalProps) => {

    const [loading, setLoading] = useState(true);

    const navigate = useNavigate();

    const { classId, subjectId, examId } = useParams();

    const [teachers, setTeachers] = useState<ISelectData[]>([]);
    const [payload, setPayload] = useState<IUpdateExamPayload>({...exam, appliedAt: !exam.appliedAt ? undefined : exam.appliedAt.toString()});

    const getData = async () => {
        const response = await internalAPI.jsonRequest(`/users/teachers?${new URLSearchParams({ examId: examId! })}`, "GET");
        setTeachers(response.data.map((t: { name: string; id: number; }) => ({
            key: t.name,
            value: t.id
        })));

        setLoading(false);
    }

    const handleSubmit = async () => {

        // const apiRequest = async () => {
        //     const response = await internalAPI.jsonRequest(`/subjects/${subjectId}`, "PATCH", undefined, payload);

        //     if (!response.success)
        //         throw new Error(response.message);

        //     return response.data;
        // }

        // const message = toast.loading("Updating subject...");
        // apiRequest().then(content => {
        //     toast.update(message, {
        //         ...toastifyUpdate,
        //         render: "Subject updated successfully!",
        //         type: "success"
        //     });

        //     setSubject({
        //         ...subject,
        //         ...content
        //     })

        //     console.log(content);
        // }).catch(err => {
        //     toast.update(message, {
        //         ...toastifyUpdate,
        //         render: err.message || "Something went wrong.",
        //         type: "error"
        //     });
        // }).finally(() => {
        //     handleClose();
        // })

    }

    const handleDelete = () => {
        // if (!confirm("Do you really want to delete this subject?"))
        //     return;

        // const apiRequest = async () => {
        //     await internalAPI.jsonRequest(`/subjects/${subjectId}`, "DELETE");
        // }

        // const message = toast.loading("Updating subject...");
        // apiRequest().then(() => {
        //     toast.update(message, {
        //         ...toastifyUpdate,
        //         render: `${subject.curricularUnit} deleted successfully!`,
        //         type: "success"
        //     });
        // }).catch(err => {
        //     toast.update(message, {
        //         ...toastifyUpdate,
        //         render: err.message || `Unable to delete ${subject.curricularUnit}`,
        //         type: "error"
        //     });
        // }).finally(() => {
        //     navigate(`/classes/${classId}`);
        // })
    }

    const handleClose = () => {
        handleIsOpen();
    }

    useEffect(() => {
        getData();
    }, [])

    useEffect(() => {
        setPayload({ ...exam, appliedAt: !exam.appliedAt ? undefined : exam.appliedAt.toString()});
    }, [isOpen]);

    useEffect(() => {
        console.log(payload)
        console.log(exam)
    }, [payload])


    if (loading)
        return (
            <Modal open={isOpen} handleClose={handleClose} title={exam.name} >
                <div className={`${styles.center}`}>
                    <Progress component={true} />
                </div>
            </Modal>
        )

    return (
        <>
            <Modal open={isOpen} handleClose={handleClose} title={exam.name} >
                <div className={`${styles.inputs}`}>
                    <div className={`${styles.section}`}>
                        <Input label="Exam name" value={payload.name} width={"70%"} onChange={(e) => setPayload({ ...payload, name: e.target.value })} />
                        <Input dateChange={(e) => setPayload({ ...payload, appliedAt: e?.format("YYYY-MM-DD") })} label="Applied at" width={"30%"} value={payload.appliedAt ? formatDate(payload.appliedAt) : undefined} type="date" />
                    </div>
                    <TextArea label="Exam description" style={{ height: "120px" }} value={payload.description} setValue={(e: string) => setPayload({ ...payload, description: e })} maxlength={255} />
                    <Select
                        label="Responsible teacher"
                        data={teachers}
                        hasDefault={payload?.instructorId != null}
                        onChange={(e) => setPayload({ ...payload, instructorId: Number(e.target.value) })}
                    />
                    <br />
                    <div className={`${styles.bttns}`}>
                        <Button kind="danger" className={`${styles.flex_start}`} onClick={handleDelete}>Delete</Button>
                        <Button onClick={handleClose}>Cancel</Button>
                        <Button variant="contained" onClick={handleSubmit}>Confirm</Button>
                    </div>
                </div>
            </Modal>
        </>
    )
}