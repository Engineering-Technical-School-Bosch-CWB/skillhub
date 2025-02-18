import Modal from "@/components/Modal";
import styles from "./styles.module.css";
import Text from "@/typography";
import { useParams } from "react-router-dom";
import Button from "@/components/Button";
import { toast } from "react-toastify";
import { ISubject } from "@/interfaces/models/ISubject";
import Input from "@/components/Input";

interface IModalProps {
    isOpen: boolean
    handleIsOpen: Function
    subject: ISubject
}

export default ({ isOpen, handleIsOpen, subject }: IModalProps) => {

    const { subjectId } = useParams();

    const handleSubmit = async () => {

        const message = toast.loading("Writing feedback...");
        handleClose();

    }

    const handleDelete = () => {

    }

    const handleClose = () => {
        handleIsOpen();
    }

    return (
        <>
            <Modal open={isOpen} handleClose={handleClose} title={`${subject.curricularUnit}`} >
                <div className={`${styles.inputs}`}>
                    <div className={`${styles.section}`}>
                        <Input label="Duration hours" width={"30%"} value={subject.durationHours} type="number" min={0} />
                        <Input label="Period" width={"20%"} value={subject.period} type="number" min={0} max={50} />
                        <Input label="Initial date" width={"50%"} value={subject.beganAt} type="date" />
                    </div>
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