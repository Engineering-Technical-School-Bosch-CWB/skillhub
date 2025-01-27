import Modal from "../../../../components/Modal"
import { AddModalProps, ModalContentProps } from "../../interfaces/ClassDetails.interfaces"
import Input from "../../../../components/Input"

import styles from '../../styles.module.css'
import Text from "../../../../typography"
import { useEffect, useState } from "react"
import Button from "../../../../components/Button"
import internalAPI from "../../../../service/internal.services"

export default ({ isOpen, onClose }: AddModalProps) => {

    const getData = async () => {
        const response = await internalAPI.jsonRequest("/curricularUnits", "GET");
        const content = response.data;

        console.log(content);
    }

    const [content, setContent] = useState<ModalContentProps[]>([
        {
            subject: "",
            time: 0
        }
    ])

    const handleAddContent = () => {
        setContent([...content, { subject: "", time: 0 }])
    }

    const handleInputChange = (index: number, field: keyof ModalContentProps, value: string | number) => {
        const updatedContent = [...content];
        field === 'subject' ?
            updatedContent[index].subject = value as string :
            updatedContent[index].time = value as number;
        setContent(updatedContent)
    }

    const handleSave = () => {
        // connection with API and reload page
    }

    useEffect(() => {
        getData();
    }, [isOpen])

    return (
        <>
            <Modal
                handleClose={() => onClose()}
                open={isOpen} title={"Add Subjects"}            >
                <div className={`${styles.modal_content} ${styles.align}`}>
                    {/* <Text fontSize="lg" fontWeight="extrabold">Adicionar Matérias</Text> */}
                    <span></span>
                    <div className={`${styles.modal_input_label_container} ${styles.align}`}>
                        <Text>Curricular Unit</Text>
                        <Text>Duration (h)</Text>
                    </div>
                    {
                        content.map((e, _index: number) => (
                            <div className={`${styles.modal_input_container}`}>
                                <Input className={`${styles.subject_input}`} onChange={(e) => handleInputChange(_index, 'subject', e.target.value)} />
                                <Input className={`${styles.time_input}`} onChange={(e) => handleInputChange(_index, 'time', e.target.value)} type="number" />
                            </div>
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
