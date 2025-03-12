import Text from "../../../../typography"
import styles from "../../styles.module.css";
import Button from "../../../../components/Button"
import CourseIndex from "./components/CourseIndex"
import internalAPI from "@/service/internal.services"
import OverviewIndex from "./components/OverviewIndex/OverviewIndex"
import StudentIndex from "./components/StudentIndex"
import SubjectsIndex from "./components/SubjectsIndex"

import { useState } from "react"
import { useNavigate } from "react-router-dom"
import { IAddClassPageProps } from "./interfaces/AddClassPage.interface"
import { toast } from "@/components/Toast";

export default ({ data, index, setIndex, setClass, setStudents, setSubjects }: IAddClassPageProps) => {

    const [dataChecked, setDataChecked] = useState(false);

    const pages = [
        <CourseIndex updateClass={setClass} _class={data.class} _course={data.course} />,
        <StudentIndex students={data.students} setStudents={setStudents} />,
        <SubjectsIndex subjects={data.subjects} alterSubjects={setSubjects} />,
        <OverviewIndex data={data} setDataChecked={setDataChecked} />
    ]
    const pagesTitle = ["Class", "Students", "Subjects", "Overview"]
    const navigate = useNavigate()

    const handleSend = async () => {
        const response = await internalAPI.jsonRequest("/classes", "POST", undefined, { ...data, courseId: data.course?.id })

        if (!response.success) {
            toast({
                data: {
                    title: "Error on create class",
                    message: response.message,
                    kind: "error"
                }, 
                toastId: "create-class-error"
            })
            return;
        }
        const content = response.data;

        navigate(`/classes/${content.id}`)
    }

    const renderIndexes = () => {
        return pages.map((_, _index) =>
            <>
                <section>
                    <Button
                        variant={_index <= index ? "select_rounded" : "rounded"}
                        onClick={() => setIndex(_index)}
                    >
                        {_index + 1}
                    </Button>
                    <Text fontSize="sm">
                        {pagesTitle[_index]}
                    </Text>
                </section>
                {
                    _index != pages.length - 1 ?
                        <div
                            className={_index + 1 <= index ? styles.separator_activated : styles.separator}
                        /> : ""
                }
            </>
        )
    }

    const handleSetIndex = (next: boolean) => {
        if (next)
            setIndex(index + 1);
        else
            if (index > 0)
                setIndex(index - 1);

    }

    return (
        <div className={styles.content}>
            <section className={styles.page_indexes}>
                {renderIndexes()}
            </section>

            <div className={styles.form}>
                {pages[index]}
            </div>

            <section className={styles.btn_area}>
                <Button onClick={() => handleSetIndex(false)}>Previous</Button>
                {
                    index != pages.length - 1 ?
                        <Button variant="contained" onClick={() => handleSetIndex(true)}>Next</Button> :
                        <Button variant="contained" disabled={!dataChecked} onClick={() => handleSend()} >Send</Button>
                }
            </section>
        </div>
    )
}