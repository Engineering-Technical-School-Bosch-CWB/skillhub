import Modal from "@/components/Modal"
import Select from "@/components/Select"
import internalAPI from "@/service/internal.services"
import { useEffect } from "react"

interface IModalProps {
    isOpen: boolean,
    handleIsOpen: Function,
    feedbackId?: number
}


export default ({ isOpen, handleIsOpen, feedbackId }: IModalProps) => {

    const getData = async () => {

        if (feedbackId) {
            const response = await internalAPI.jsonRequest(`/feedbacks/${feedbackId}`, "GET");
            const content = response.data;

            console.log(content);
        } else {
            
        }

    }

    useEffect(() => {
        getData();
    }, [feedbackId])

    return (
        <>
            <Modal open={isOpen} handleClose={() => handleIsOpen(false)} title={!feedbackId ? "Write Feedback" : "Edit Feedback"} >
                {
                    !feedbackId &&
                    <Select data={[]} label="Select a subject" />
                }
            </Modal>

        </>
    )
}