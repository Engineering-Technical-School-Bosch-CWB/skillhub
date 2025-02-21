import Modal from "../../../../components/Modal"
import { AddModalProps, ModalContentProps } from "../../interfaces/ClassDetails.interfaces"
import styles from '../../styles.module.css'
import Text from "../../../../typography"
import { useState } from "react"
import Button from "../../../../components/Button"
import internalAPI from "../../../../service/internal.services"
import SelectSubject from "./components/SelectSubject"
import { toast } from "react-toastify"

export default ({ isOpen, onClose, classId }: AddModalProps) => {

    const [content, setContent] = useState<ModalContentProps[]>([
        {
            id: 0,
            subject: "",
            curricularUnitId: 0,
            time: 0
        }
    ])

    const handleAddContent = () => {
        setContent([...content, {id: 0, subject: "", curricularUnitId: 0, time: 0}])
    }

    const alterItem = (index: number, key: string, value: any) => {
        setContent(prev => {
            const temp = [...prev]
            temp[index] = {
                ...temp[index], 
                [key]: value
            }
            return temp;
        })
    }

    const deleteItem = (index: number) => {
        setContent(prev => {
            const _temp = [...prev];
            _temp.splice(index, 1);
            return _temp
        })
    }

    const handleSave = async () => {
        const response = await internalAPI.jsonRequest(`/subjects/byClass/${classId}`,"POST", undefined, content);
        if(!response || !response.success)
            toast.error(`Error on create subject: ${response.message}`, {toastId: "subject-create-error"})
        else {
            location.reload();

        }
    }

    return (
        <>
            <Modal
                handleClose={() => onClose()}
                open={isOpen} title={"Add Subjects"}            >
                <div className={`${styles.modal_content} ${styles.align}`}>
                    <span></span>
                    <div className={`${styles.modal_input_label_container} ${styles.align}`}>
                        <Text>Curricular Unit</Text>
                        <Text>Duration (h)</Text>
                    </div>
                    {
                        content.map((e, i: number) => (
                            <SelectSubject key={i} onChange={(_e, f) => alterItem(i, _e, f)} def={e} onDelete={() => deleteItem(i)} />
                        ))
                    }

                    <Button variant="contained" onClick={() => handleAddContent()}>Add +</Button>
                    <div className={`${styles.btnArea} ${styles.align}`}>
                        <Button variant="outlined" onClick={() => console.log(content)}>Get from other class</Button>
                        <Button variant="contained" onClick={() => handleSave()}>Save</Button>
                    </div>
                </div>
            </Modal>
        </>
    )
}
