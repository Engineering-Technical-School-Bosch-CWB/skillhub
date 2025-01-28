import { useState } from "react";
import Header from "../../components/Header"
import ReturnButton from "../../components/ReturnButton"
import Text from "../../typography"

import styles from "./styles.module.css";
import { IAddClassPageProps } from "./components/AddPaginator/interfaces/AddClassPage.interface";
import AddPaginator from "./components/AddPaginator";

export default () => {

    const [data, setData] = useState<IAddClassPageProps>({
        data: {
            class: {
                abbreviation: "",
                name: "",
                periods: 0
            },
            course: {
                name: "",
                id: 0
            },
            students:[],
            subjects: [],
            template: false

        },
        index: 0,
        setClass: (newClass) => {
            setData((prev) => ({
              ...prev,
              data: {
                ...prev.data,
                class: newClass,
              },
            }));
        },
        setStudents: (students) => {
            setData((prev) => ({
                ...prev,
                data: {
                ...prev.data,
                students,
                },
            }));
        },
        setSubjects: (subjects) => {
            setData((prev) => ({
                ...prev,
                data: {
                ...prev.data,
                subjects,
                },
            }));
        },
        setIndex: (index) => {
            setData((prev) => ({
                ...prev,
                index,
            }));
        },
      
      
    });

    return (
        <div>
            {/* <Header /> */}
            <section className={styles.main_container}>
                <section className={styles.top_section}>
                    <ReturnButton />
                    <Text fontWeight="bold" fontSize="xl2">New Class</Text>
                </section>

                <div className={styles.container}>
                    <AddPaginator {...data}/>
                </div>
            </section>
        </div>
    )
}