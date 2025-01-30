import Text from "@/typography"
import styles from "../../../styles.module.css"
import Input from "@/components/Input"
import InputSelect from "@/components/InputSelect"
import { IAddSubject } from "../interfaces/AddClassPage.interface"
import internalAPI from "@/service/internal.services"
import { toast } from "react-toastify"
import { ISubject } from "@/interfaces/models/ISubject"
import { useState } from "react"
import Button from "@/components/Button"

export interface ISubjectIndex{
    subjects: IAddSubject[],
    alterSubjects: (values: IAddSubject[]) => void
}

export default ({subjects: selectedSubjects, alterSubjects}: ISubjectIndex) => {

    const [subjects, setSubjects] = useState([])

    const loadSubjects = async () => {
        const response = await internalAPI.jsonRequest('/subject', 'GET')
        if(!response || response.statusCode != 200)
            if (!toast.isActive("user-load-error"))
                toast.error("Authentication required.", { toastId: "user-load-error" });

        const _data = response.data as ISubject[];
        
        alterSubjects(selectedSubjects)
    }

    return (
        <div className={styles.form_content}>
            <section className={styles.card_page_header}>
                <Text fontSize="lg" fontWeight="bold">Subjects</Text>
            </section>
            
            <section className={`${styles.dual_input_zone} ${styles.divided_input_2_1}`}>
                <InputSelect data={subjects} label="Subject" /> 
                <Input label="Duration" />
            </section>

            <section className={`${styles.btn_area}`}>
                <Button>ADD +</Button>
            </section>
        </div>
    )
}