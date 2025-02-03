import Modal from "@/components/Modal"
import Select from "@/components/Select"
import TextArea from "@/components/TextArea"
import internalAPI from "@/service/internal.services"
import styles from "../../styles.module.css"
import Text from "@/typography"

import { useEffect, useState } from "react"
import { ISelectData } from "@/components/Select/interfaces"
import Button from "@/components/Button"

interface IModalProps {
    isOpen: boolean
    handleIsOpen: Function
    feedbackId?: number
    classId: number
    userName: string
    className: string
    studentId: number
}


export default ({ isOpen, handleIsOpen, feedbackId, classId, userName, className, studentId }: IModalProps) => {

    const [subjectData, setSubjectData] = useState<ISelectData[]>([]);
    const [feedbackContent, setFeedbackContent] = useState("");

    const getData = async () => {

        if (feedbackId) {
            const response = await internalAPI.jsonRequest(`/feedbacks/${feedbackId}`, "GET");
            const content = response.data;

        } else if (classId) {
            const response = await internalAPI.jsonRequest(`/subjects/class/${classId}?${new URLSearchParams({ studentId: studentId.toString() })}`, "GET");
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
            <Modal open={isOpen} handleClose={() => handleIsOpen()} title={!feedbackId ? "Write Feedback" : "Edit Feedback"} >
                <div className={`${styles.feedbacks}`}>
                    <Text>{"Write your feedback for " + userName + " from " + className}</Text>
                    {
                        !feedbackId &&
                        <Select data={subjectData} label="Personal Feedback" />
                    }
                    <TextArea value={feedbackContent} setValue={setFeedbackContent} placeHolder="Write your feedback here..." />
                    <div className={`${styles.bttns}`}>
                        <Button onClick={() => handleIsOpen()}>Cancel</Button>
                        <Button variant="contained">Confirm</Button>
                    </div>
                </div>
            </Modal>

        </>
    )
}