import { useState } from "react";
import Header from "../../components/Header"
import styles from "./styles.module.css";
import { IAddClassPageProps } from "./components/AddPaginator/interfaces/AddClassPage.interface";
import AddPaginator from "./components/AddPaginator";
import SectionHeader from "@/components/SectionHeader";
import { t } from "i18next";

export default () => {

    const [data, setData] = useState<IAddClassPageProps>({
        data: {
            class: {
                startingYear: (new Date()).getFullYear()
            },
            students:[],
            subjects: [],
            template: false

        },
        index: 0,
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
                <SectionHeader 
                    links={
                        [
                            {
                                label: t('classesOverview.classes'),
                                goTo: "/classes"
                            },
                            {
                                label: t('createClass.new'),
                            }
                        ]} 
                />

                <div className={styles.container}>
                    <AddPaginator {...data}/>
                </div>
            </main>
        </div>
    )
}