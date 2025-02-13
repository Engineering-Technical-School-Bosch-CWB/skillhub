import Modal from "@/components/Modal"
import Button from "@/components/Button"
import Select from "@/components/Select"
import TextArea from "@/components/TextArea"
import internalAPI from "@/service/internal.services"
import toastifyUpdate from "@/constants/toastfyUpdate"
import styles from "../../styles.module.css"
import Text from "@/typography"

import { useEffect, useState } from "react"
import { ISelectData } from "@/components/Select/interfaces"
import { IStudentData } from "../../interfaces/UserProfile.interface"
import { toast } from "react-toastify"

interface IModalProps {
    isOpen: boolean
    handleIsOpen: Function
    feedbackId?: number
    userName: string
    studentData: IStudentData
    setStudentData: Function
}


export default ({ isOpen, handleIsOpen, feedbackId, userName, studentData, setStudentData }: IModalProps) => {

    const [subjectData, setSubjectData] = useState<ISelectData[]>([]);
    const [feedbackContent, setFeedbackContent] = useState<string>();

    const [canSee, setCanSee] = useState(false);

    const [selectedSubjectId, setSelectedSubjectId] = useState<number>();
    const [subject, setSubject] = useState<string | null>("");

    const getData = async () => {

        if (feedbackId) {
            const response = await internalAPI.jsonRequest(`/feedbacks/${feedbackId}`, "GET");
            const content = response.data;

            setSubject(content.subject)
            setFeedbackContent(content.content);
            setCanSee(content.studentMayVisualize)


        } else {
            const response = await internalAPI.jsonRequest(`/subjects/class/${studentData.classId}?${new URLSearchParams({ studentId: studentData.id.toString() })}`, "GET");
            const content = response.data;

            setSubjectData(content.map((s: { curricularUnit: string; id: number }) => ({
                key: s.curricularUnit,
                value: s.id
            })))
            setCanSee(false)
        }

    }

    useEffect(() => {
        console.log(canSee)
    }, [canSee, feedbackId])

    const handleSubmit = async () => {

        if (feedbackContent === "")
            return;

        const apiRequestCreate = async () => {
            const response = await internalAPI.jsonRequest("/feedbacks", "POST", undefined, {
                studentId: studentData.id,
                subjectId: selectedSubjectId,
                content: feedbackContent,
                studentMayVisualize: canSee
            });

            if (!response.success)
                throw new Error(response.message);

            return response.data;
        }

        const apiRequestUpdate = async () => {
            const response = await internalAPI.jsonRequest(`/feedbacks/${feedbackId}`, "PATCH", undefined, {
                content: feedbackContent,
                studentMayVisualize: canSee
            });

            if (!response.success)
                throw new Error(response.message);

            return response.data;
        }

        const message = toast.loading("Writing feedback...");

        setFeedbackContent("");
        setSubject("");

        if (!feedbackId) {
            apiRequestCreate().then(content => {
                toast.update(message, {
                    ...toastifyUpdate,
                    render: "Feedback created successfully!",
                    type: "success",
                });

                if (content.subjectId) {
                    setStudentData({
                        ...studentData,
                        subjectFeedBacks: [content, ...studentData.subjectFeedBacks]
                    });
                } else {
                    setStudentData({
                        ...studentData,
                        feedbacks: [content, ...studentData.feedbacks]
                    });
                }

                handleIsOpen();
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
                render: "Feedback updated successfully!",
                type: "success",
            });

            if (content.subjectId) {
                setStudentData({
                    ...studentData,
                    subjectFeedBacks: [
                        content,
                        ...studentData.subjectFeedBacks.filter(f => f.id !== feedbackId)
                    ]
                });
            } else {
                setStudentData({
                    ...studentData,
                    feedbacks: [
                        content,
                        ...studentData.feedbacks.filter(f => f.id !== feedbackId)
                    ]
                });
            }

            handleIsOpen();
        }).catch(err => {
            toast.update(message, {
                ...toastifyUpdate,
                render: err.message || "Something went wrong.",
                type: "error",
            });
        });
    }

    const handleDelete = async () => {

        if (!confirm("Do you really want to delete this feedback?"))
            return;
        

        const apiRequest = async () => {
            const response = await internalAPI.jsonRequest(`/feedbacks/${feedbackId}`, "DELETE");

            if (!response.success)
                throw new Error(response.message);
        }

        const message = toast.loading("Deleting feedback...");

        setFeedbackContent("");
        setSubject("");

        apiRequest().then(() => {
            toast.update(message, {
                ...toastifyUpdate,
                render: "Feedback deleted successfully!",
                type: "success",
            });

            setStudentData({
                ...studentData,
                feedbacks: [
                    ...studentData.feedbacks.filter(f => f.id !== feedbackId)
                ]
            });

            handleIsOpen();

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
        setSubject("");

        handleIsOpen();
    }

    useEffect(() => {
        getData();
    }, [feedbackId, studentData])

    return (
        <>
            <Modal open={isOpen} handleClose={handleClose} title={!feedbackId ? "Write Feedback" : "Edit Feedback"} >
                <div className={`${styles.feedbacks}`}>
                    <Text>
                        {"Write your feedback for " + userName + " from " + studentData.className}
                        {
                            subject &&
                            <>
                                <Text>{" for the subject "}</Text>
                                <Text fontWeight="bold">{subject}</Text>
                            </>
                        }
                    </Text>
                    {
                        !feedbackId &&
                        <Select data={subjectData} label="Personal Feedback" onChange={(e) => setSelectedSubjectId(Number(e.target.value))} />
                    }
                    <TextArea value={feedbackContent!} setValue={setFeedbackContent} placeHolder="Write your feedback here..." required={true} />
                    {
                        !selectedSubjectId &&
                        <div className={`${styles.obs}`}>
                            <label className={`${styles.toggle_switch}`}>
                                <input
                                    type="checkbox"
                                    checked={canSee}
                                    onChange={() => setCanSee(!canSee)}
                                />
                                <span className={`${styles.slider}`}></span>
                            </label>
                            <Text fontSize="sm">
                                Student can see feedback
                            </Text>
                        </div>
                    }
                    <div className={`${styles.bttns}`}>
                        {
                            feedbackId && subject == null &&
                            <Button kind="danger" className={`${styles.flex_start}`} onClick={handleDelete}>Delete</Button>
                        }
                        <Button onClick={handleClose}>Cancel</Button>
                        <Button variant="contained" onClick={handleSubmit} >Confirm</Button>
                    </div>
                </div>
            </Modal>

        </>
    )
}