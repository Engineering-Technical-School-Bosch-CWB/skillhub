import Input from "../../../../../components/Input"
import { IAddClass, IGetCourse } from "../interfaces/AddClassPage.interface"

import styles from "../../../styles.module.css"
import CourseSelect from "./CourseSelect"
import { useEffect, useState } from "react"
import { IClass } from "../../../../../interfaces/models/IClass"
import Select from "../../../../../components/Select"
import { ISelectData, ISelectProps } from "../../../../../components/Select/interfaces"
import internalAPI from "../../../../../service/internal.services"
import { toast } from "react-toastify"
import { ICourse } from "../../../../../interfaces/models/ICourse"

export default (classData: IAddClass, course: IGetCourse) => {
    
    const [classes, setClasses] = useState<IClass[]>([]);
    const [isTemplate, setIsTemplate] = useState(false);
    const [courses, setCourses] = useState<ISelectProps>({
        data: [],
        label: "Select a course:",
        hasDefault: false
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
                    value: `${item.id}`
                }
            })
        }))
        
    }

    useEffect(() => {
        getCourses();
    }, [])

    return (
        <div className={styles.form_content}>
            <h1>Course</h1>
            {/* <CourseSelect /> */}
            <Select {...courses} />
            <section>
                <Input label="Class name" />
                <Input label="Abbreviation" /> 
            </section>

        </div>
    )
}