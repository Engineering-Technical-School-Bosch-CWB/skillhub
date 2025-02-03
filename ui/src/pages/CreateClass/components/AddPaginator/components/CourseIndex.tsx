import Input from "@/components/Input"
import { IAddClass, IAddCourse } from "../interfaces/AddClassPage.interface"

import styles from "../../../styles.module.css"
import { ISelectData } from "@/components/Select/interfaces"
import CourseSelect from "./CourseSelect"
import Text from "@/typography"

interface ICourseIndexProps{
    updateClass: (classValue: IAddClass, courseValue: IAddCourse) => void,
    _class: IAddClass,
    _course: IAddCourse
}

export default ({updateClass, _class, _course}: ICourseIndexProps) => {
    
    const handleChangeCourse = (obj?: ISelectData, className?: string, classAbbreviation?: string ) => {
        updateClass({
            name: className ?? _class.name,
            abbreviation: classAbbreviation ?? _class.abbreviation,
            period: _class.period,
            startingYear:  _class.startingYear
        }, {
            name: obj?.key ?? _course.name,
            id: obj?.value ?? _course.id
        });
    }

    const changeData= (e: string) => {
        updateClass(
            {
                name: _class.name,
                abbreviation: _class.abbreviation,
                period: _class.period,
                startingYear:  +e
            }, {
                name: _course.name,
                id: _course.id
            }    
        )
    }

    const changePeriod = (e :string) => {
        updateClass(
            {
                name: _class.name,
                abbreviation: _class.abbreviation,
                period: +e,
                startingYear:  _class.startingYear
            }, {
                name: _course.name,
                id: _course.id
            }    
        )
    }

    return (
        <div className={styles.form_content}>
            <section className={styles.card_page_header}>
                <Text fontSize="lg" fontWeight="bold">Class</Text>
            </section>
                <section className={styles.card_page_content}>
                <CourseSelect
                    defaultValue={{
                        key: _course.name,
                        value: _course.id
                    }} 
                    onChange={(e) => handleChangeCourse(e)} 
                    />
                
                <section className={`${styles.dual_input_zone} ${styles.divided_input_2_1}`}>
                    <Input label="Class name" 
                        value={_class.name}
                        onChange={(e) => handleChangeCourse(undefined, e.target.value)} 
                    />
                    <Input label="Abbreviation" 
                        value={_class.abbreviation}
                        onChange={(e) => handleChangeCourse(undefined, undefined, e.target.value)} 
                    /> 
                </section>
                <section className={`${styles.dual_input_zone} ${styles.divided_input_2_1}`}>
                    <Input 
                        label="Start Year"
                        type="number" 
                        value={_class.startingYear}
                        onChange={(e) => changeData(e.target.value)}
                        /> 
                    <Input 
                        label="Periods"
                        type="number" 
                        value={_class.period}
                        onChange={(e) => changePeriod(e.target.value)}
                    /> 
                </section>
            </section>
        </div>
    )
}