import Modal from "@/components/Modal"
import Select from "@/components/Select"
import { ISelectData } from "@/components/Select/interfaces"
import internalAPI from "@/service/internal.services"
import { useEffect, useState } from "react"

interface IModalProps {
    isOpen: boolean,
    handleIsOpen: Function,
    feedbackId?: number,
    classId: number,
}


export default ({ isOpen, handleIsOpen, feedbackId, classId }: IModalProps) => {

    const [subjectData, setSubjectData] = useState<ISelectData[]>([]);

    const getData = async () => {

        if (feedbackId) {
            const response = await internalAPI.jsonRequest(`/feedbacks/${feedbackId}`, "GET");
            const content = response.data;

        } else if (classId) {
            const response = await internalAPI.jsonRequest(`/subjects/class/${classId}`, "GET");
            const content = response.data;

            setSubjectData(content.map((s: { curricularUnit: string; id: number }) => ({
                key: s.curricularUnit,
                value: s.id
            })))

        }

    }

    useEffect(() => {
        getData();
    }, [feedbackId, classId])

    return (
        <>
            <Modal open={isOpen} handleClose={() => handleIsOpen(false)} title={!feedbackId ? "Write Feedback" : "Edit Feedback"} >
                {
                    !feedbackId &&
                    <Select data={subjectData} label="Select a subject" />
                }
            </Modal>

        </>
    )
}