import Modal from "@/components/Modal";
import styles from "./styles.module.css";
import Text from "@/typography";
import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import TextArea from "@/components/TextArea";
import Button from "@/components/Button";
import internalAPI from "@/service/internal.services";
import { toast } from "react-toastify";
import toastifyUpdate from "@/constants/toastfyUpdate";
import { IFeedback } from "../../interfaces/SubjectDetails.interface";

interface IModalProps {
    isOpen: boolean
    handleIsOpen: Function
    feedback?: {
        id: number
        content: string
    }
    student: {
        id: number
        name: string
    }
    handleFeedbacks: {
        feedbacks: IFeedback[]
        setFeedbacks: Function
    }
}

export default ({ isOpen, handleIsOpen, feedback, student, handleFeedbacks }: IModalProps) => {

    const { subjectId } = useParams();

    const [feedbackContent, setFeedbackContent] = useState(feedback?.content || "");

    const handleSubmit = async () => {

        if (feedbackContent === "")
            return;

        const apiRequestCreate = async () => {
            const response = await internalAPI.jsonRequest("/feedbacks", "POST", undefined, {
                studentId: student.id,
                subjectId: subjectId,
                content: feedbackContent
            });

            if (!response.success)
                throw new Error(response.message);

            return response.data;
        }

        const apiRequestUpdate = async () => {
            const response = await internalAPI.jsonRequest(`/feedbacks/${feedback?.id}`, "PATCH", undefined, {
                content: feedbackContent
            });

            if (!response.success)
                throw new Error(response.message);

            return response.data;
        }

        const message = toast.loading("Writing feedback...");
        handleClose();

        if (!feedback) {
            apiRequestCreate().then(content => {
                toast.update(message, {
                    ...toastifyUpdate,
                    render: "Feedback written successfully!",
                    type: "success",
                });

                handleFeedbacks.setFeedbacks(handleFeedbacks.feedbacks.map(f =>
                    f.student.id == student.id ?
                        {
                            student: f.student,
                            feedback: {
                                id: content.id,
                                content: content.content,
                                updatedAt: content.updatedAt,
                                instructor: content.instructor
                            }
                        } : f
                ));

            }).catch(err => {
                toast.update(message, {
                    ...toastifyUpdate,
                    render: err.message || "Something went wrong.",
                    type: "error",
                });
            });

            return;
        }

        apiRequestUpdate().then(content => {
            toast.update(message, {
                ...toastifyUpdate,
                render: "Feedback written successfully!",
                type: "success",
            });

            handleFeedbacks.setFeedbacks(handleFeedbacks.feedbacks.map(f =>
                f.student.id == student.id ?
                    {
                        student: f.student,
                        feedback: {
                            id: content.id,
                            content: content.content,
                            updatedAt: content.updatedAt,
                            instructor: content.instructor
                        }
                    } : f
            ));

        }).catch(err => {
            toast.update(message, {
                ...toastifyUpdate,
                render: err.message || "Something went wrong.",
                type: "error",
            });
        });
    }

    const handleClose = () => {
        setFeedbackContent("");
        handleIsOpen();
    }

    return (
        <>
            <Modal open={isOpen} handleClose={handleClose} title={"Edit Feedback"} >
                <div className={`${styles.feedbacks}`}>
                    <Text>{"Write your feedback for " + student.name}</Text>
                    <TextArea value={feedbackContent!} setValue={setFeedbackContent} placeHolder="Write your feedback here..." required={true} />
                    <div className={`${styles.bttns}`}>
                        <Button onClick={handleClose}>Cancel</Button>
                        <Button variant="contained" onClick={handleSubmit} >Confirm</Button>
                    </div>
                </div>
            </Modal>
        </>
    )
}