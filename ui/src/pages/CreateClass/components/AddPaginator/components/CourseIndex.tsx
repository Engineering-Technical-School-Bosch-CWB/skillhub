import Input from "@/components/Input"
import { IAddClass, IGetCourse } from "../interfaces/AddClassPage.interface"

import styles from "../../../styles.module.css"
import { useEffect, useState } from "react"
import { IClass } from "@/interfaces/models/IClass"
import { ISelectProps } from "@/components/Select/interfaces"
import internalAPI from "@/service/internal.services"
import { toast } from "react-toastify"
import { ICourse } from "@/interfaces/models/ICourse"
import Select from "@/components/Select"
import CourseSelect from "./CourseSelect"

export default (classData: IAddClass, course: IGetCourse) => {
    
    const [classes, setClasses] = useState<IClass[]>([]);
    const [isTemplate, setIsTemplate] = useState(false);

    const [courses, setCourses] = useState<ISelectProps>({
        data: [],
        label: "Select a course:",
        hasDefault: false,
        onChange: (e) => {
            e.target.value
        }
    });
    
    const getCourses = async () => {
        const response = await internalAPI.jsonRequest("/course", "GET");
        if(!response || response.statusCode != 200)
            if(!toast.isActive("get-courses-error"))
                toast.error("Error on get courses.",{toastId: "get-courses-error"  })

        let _courses = response.data as ICourse[];
        console.log(_courses);

        setCourses((prev) => ({
            ...prev,
            data: _courses.map((item) => {
                return {
                    key: item.name,
                    value: item.id
                }
            })
        }))
        
    }

    const getFakeCourses = () => {
        setCourses((prev) => ({
            ...prev,
            data: [
                {
                    key: "Digital Talent Academy",
                    value:1
                },
                {
                    key: "Cibersistemas",
                    value:2
                },
                {
                    key: "Mecânica",
                    value:3
                },
                {
                    key: "Desenvolvimento de sistemas",
                    value:4
                },
            ]
        }))
    }

    useEffect(() => {
        // getCourses();
        getFakeCourses()
    }, [])

    return (
        <div className={styles.form_content}>
            <section className={styles.card_page_header}>
                <h1>Course</h1>
            </section>
            <CourseSelect />
            <Select {...courses} />
            <section className={`${styles.dual_input_zone} ${styles.divided_input_2_1}`}>
                <Input label="Class name" />
                <Input label="Abbreviation" /> 
            </section>

        </div>
    )
}