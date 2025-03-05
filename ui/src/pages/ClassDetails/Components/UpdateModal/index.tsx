import Modal from "@/components/Modal";
import styles from "./styles.module.css";
import Button from "@/components/Button";
import Input from "@/components/Input";
import internalAPI from "@/service/internal.services";
import toastifyUpdate from "@/constants/toastfyUpdate";

import { toast } from "react-toastify";
import { useNavigate, useParams } from "react-router-dom";
import { ISelectData } from "@/components/Select/interfaces";
import { useEffect, useState } from "react";
import { IClass } from "../../interfaces/ClassDetails.interfaces";

interface IModalProps {
    isOpen: boolean
    handleIsOpen: Function
    _class: IClass
    setClass: Function
}


export default ({ isOpen, handleIsOpen, _class, setClass }: IModalProps) => {

    const navigate = useNavigate();

    const { classId } = useParams();

    const [teachers, setTeachers] = useState<ISelectData[]>([]);
    const [payload, setPayload] = useState<IClass>(_class);

    const handleSubmit = async () => {

        const apiRequest = async () => {
            const response = await internalAPI.jsonRequest(`/classes/${classId}`, "PATCH", undefined, payload);

            if (!response.success)
                throw new Error(response.message);

            return response.data;
        }

        const message = toast.loading("Updating class...");
        apiRequest().then(content => {

            toast.update(message, {
                ...toastifyUpdate,
                render: "Class updated successfully!",
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
                render: err.message || "Something went wrong.",
                type: "error"
            });
        }).finally(() => {
            handleClose();
        })
    }

    const handleDelete = () => {
        if (!confirm(`Are you sure you want to DELETE ${_class.name} - ${_class.startingYear}?`))
            return

        const apiRequest = async () => 
            await internalAPI.jsonRequest(`/classes/${classId}`, "DELETE");

        const message = toast.loading("Deleting class...");
        apiRequest().then(() => {
            toast.update(message, {
                ...toastifyUpdate,
                render: `${_class.name + " - " + _class.startingYear} deleted successfully!`,
                type: "success"
            });

            navigate(`/classes`);
        }).catch(err => {
            toast.update(message, {
                ...toastifyUpdate,
                render: err.message || `Unable to delete ${_class.name + " - " + _class.startingYear}`,
                type: "error"
            });

            handleClose();
        })
    }

    const handleArchive = () => {
        if (!confirm(`Are you sure you want to ARCHIVE ${_class.name} - ${_class.startingYear}?`))
            return

        const apiRequest = async () => 
            await internalAPI.jsonRequest(`/classes/archive/${classId}`, "PATCH");

        const message = toast.loading("Archiving class...");
        apiRequest().then(() => {
            toast.update(message, {
                ...toastifyUpdate,
                render: `${_class.name + " - " + _class.startingYear} achived successfully!`,
                type: "success"
            });

            navigate(`/classes`);
        }).catch(err => {
            toast.update(message, {
                ...toastifyUpdate,
                render: err.message || `Unable to archive ${_class.name + " - " + _class.startingYear}`,
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
                    <Input onChange={(e) => setPayload({ ...payload, name: e.target.value })} label="Class name" value={payload.name} maxLength={255} />
                    <div className={`${styles.section}`}>
                        <Input onChange={(e) => setPayload({ ...payload, abbreviation: e.target.value })} label="Abbreviation" width={"calc(100%/3)"} value={payload.abbreviation} maxLength={10} />
                        <Input onChange={(e) => setPayload({ ...payload, durationPeriods: Number(e.target.value) })} label="Duration periods" width={"calc(100%/3)"} value={payload.durationPeriods} type="number" min={0} max={50} />
                        <Input onChange={(e) => setPayload({ ...payload, startingYear: Number(e.target.value) })} label="Starting year" width={"calc(100%/3)"} value={payload.startingYear} type="number" min={1980} max={2200} />
                    </div>

                    <br />
                    <div className={`${styles.bttns}`}>
                        <div className={`${styles.bttns} ${styles.flex_start}`}>
                            <div className={`${styles.not} ${styles.tooltip}`}>
                                <Button kind="danger" onClick={handleDelete}>Delete</Button>
                                <span className={`${styles.tooltiptext}`}>Delete this class forever!</span>
                            </div>
                            <div className={`${styles.not} ${styles.tooltip}`}>
                                <Button kind="alert" onClick={handleArchive}>Archive</Button>
                                <span className={`${styles.tooltiptext}`} style={{ width: "180px" }}>Archive finished class!</span>
                            </div>
                        </div>
                        <Button onClick={handleClose}>Cancel</Button>
                        <Button variant="contained" onClick={handleSubmit}>Confirm</Button>
                    </div>
                </div>
            </Modal>
        </>
    )
}