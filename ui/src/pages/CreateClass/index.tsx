import { useState } from "react";
import Header from "../../components/Header"
import styles from "./styles.module.css";
import { IAddClassPageProps } from "./components/AddPaginator/interfaces/AddClassPage.interface";
import AddPaginator from "./components/AddPaginator";
import SectionHeader from "@/components/SectionHeader";

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
        index: 1,
        isChecked: false,
        setClass: (newClass, newCourse) => {
            setData((prev) => ({
              ...prev,
              data: {
                ...prev.data,
                class: newClass,
                course: newCourse
              },
            }));
            console.log(data);
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
            <Header />
            <main>
                <SectionHeader links={
                [
                    {
                        label: "Classes Overview",
                        goTo: "/classes"
                    },
                    {
                        label: "New"
                    }
                ]} />

                <div className={styles.container}>
                    <AddPaginator {...data}/>
                </div>
            </main>
        </div>
    )
}