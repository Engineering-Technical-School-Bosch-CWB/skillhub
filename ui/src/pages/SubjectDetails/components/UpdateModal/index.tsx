import Modal from "@/components/Modal";
import styles from "./styles.module.css";
import Text from "@/typography";
import { useParams } from "react-router-dom";
import Button from "@/components/Button";
import { toast } from "react-toastify";
import { ISubject } from "@/interfaces/models/ISubject";
import Input from "@/components/Input";
import Select from "@/components/Select";
import internalAPI from "@/service/internal.services";
import { useEffect, useState } from "react";
import { IObject } from "@/interfaces/models/IObject";
import { ISelectData } from "@/components/Select/interfaces";
import Progress from "@/components/Progress";

interface IModalProps {
    isOpen: boolean
    handleIsOpen: Function
    subject: ISubject
}

export default ({ isOpen, handleIsOpen, subject }: IModalProps) => {

    const [loading, setLoading] = useState(true);

    const { subjectId } = useParams();

    const [teachers, setTeachers] = useState<ISelectData[]>([]);

    const getData = async () => {
        const response = await internalAPI.jsonRequest("/users/teachers", "GET");
        setTeachers(response.data.map((t: { name: string; id: number; }) => ({
            key: t.name,
            value: t.id
        })));

        setLoading(false);
    }

    const handleSubmit = async () => {

        const message = toast.loading("Writing feedback...");
        handleClose();

    }

    const handleDelete = () => {
        if (!confirm("Do you really want to delete this subject?"))
            return;
    }

    const handleClose = () => {
        handleIsOpen();
    }

    useEffect(() => {
        getData();
    }, [])

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
                        <Input label="Duration hours" width={"30%"} value={subject.durationHours} type="number" min={0} />
                        <Input label="Period" width={"20%"} value={subject.period} type="number" min={0} max={50} />
                        <Input label="Initial date" width={"50%"} value={subject.beganAt} type="date" />
                    </div>
                    <Select label="Responsible teacher" data={teachers} />
                    <br />
                    <div className={`${styles.bttns}`}>
                        <Button kind="danger" className={`${styles.flex_start}`} onClick={handleDelete}>Delete</Button>
                        <Button onClick={handleClose}>Cancel</Button>
                        <Button variant="contained" onClick={handleSubmit} >Confirm</Button>
                    </div>
                </div>
            </Modal>
        </>
    )
}