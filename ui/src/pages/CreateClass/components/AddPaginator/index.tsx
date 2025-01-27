import Button from "../../../../components/Button"
import CourseIndex from "./components/CourseIndex"
import OverviewIndex from "./components/OverviewIndex"
import StudentIndex from "./components/StudentIndex"
import SubjectsIndex from "./components/SubjectsIndex"
import { IAddClassPageProps } from "./interfaces/AddClassPage.interface"

import styles from "../../styles.module.css";
import Text from "../../../../typography"

export default ({data,index, setIndex, setClass, setStudents, setSubjects} : IAddClassPageProps) => {

    const pages = [
        <CourseIndex {...data.course} {...data.class}/>,
        <StudentIndex />,
        <SubjectsIndex />,
        <OverviewIndex /> 
    ]
    const pagesTitle = ["Class","Students","Subjects","Overview"]

    const renderIndexes = () => {
        return pages.map((_, _index ) => 
            <>
                <section>
                    <Button 
                        variant={_index <= index ? "select_rounded" : "rounded" }
                        onClick={() => setIndex(_index)}
                    >
                        {_index + 1}
                    </Button>
                    <Text fontWeight="light">
                        {pagesTitle[_index]}
                    </Text>
                </section>
                {
                    _index != pages.length - 1 ?
                        <div 
                            className={_index+1 <= index ?  styles.separator_activated : styles.separator} 
                        /> : ""
                }
            </>
        )
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
                <Button>Previous</Button> 
                {
                    index != pages.length - 1 ?
                        <Button variant="contained">Next</Button> :
                        <Button variant="contained">Send</Button>

                }
            </section>
        </div>
    )
}