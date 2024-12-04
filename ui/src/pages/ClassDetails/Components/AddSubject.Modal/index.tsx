import Modal from "../../../../components/Modal"
import { AddModalProps, ModalContentProps } from "../../interfaces/ClassDetails.interfaces"
import Input from "../../../../components/Input"

import styles from '../../styles.module.css'
import Text from "../../../../typography"
import { useState } from "react"
import Button from "../../../../components/Button"

export default ({isOpened, onClose}: AddModalProps) => {

    const currentContent: ModalContentProps[] = [
        {
            subject: "Java Avançado",
            time: 80
        },
        {
            subject: "C# Avançado",
            time: 40
        },
        {
            subject: "Banco de Dados",
            time: 80
        }
    ]
    const [content, setContent] = useState<ModalContentProps[]>([
        {
            subject: "",
            time: 0
        }
    ])

    const handleAddContent = () => {
        setContent([...content, {subject: "", time: 0}])
    }

    const handleInputChange = (index: number, field: keyof ModalContentProps, value: string | number) => {
        const updatedContent = [...content];
        field === 'subject' ? 
            updatedContent[index].subject = value as string : 
            updatedContent[index].time = value as number;
        setContent(updatedContent)
    }

    const handleSave = () => {

    }

    return(
        <>
            <Modal 
                handleClose={() => onClose()} 
                open={isOpened} 
            >
                <div className={`${styles.modal_content} ${styles.align}`}>
                    <Text fontSize="lg" fontWeight="extrabold">Adicionar Matérias</Text>
                    <span></span>
                    <div className={`${styles.modal_input_label_container} ${styles.align}`}>
                        <Text>Matéria</Text>
                        <Text>Tempo</Text>
                    </div>
                    {
                        content.map((e, _index: number) => (
                            <div className={`${styles.modal_input_container}`}>
                                <Input className={`${styles.subject_input}`} onChange={(e) => handleInputChange(_index, 'subject', e.target.value) } />
                                <Input className={`${styles.time_input}`} onChange={(e) => handleInputChange(_index, 'time', e.target.value) }  />
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
