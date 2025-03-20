import Input from "@/components/Input"
import { IAddClass, IAddCourse } from "../interfaces/AddClassPage.interface"

import styles from "../../../styles.module.css"
import { ISelectData } from "@/components/Select/interfaces"
import CourseSelect from "./CourseSelect"
import Text from "@/typography"
import { t } from "i18next"

interface ICourseIndexProps {
    updateClass: (classValue: IAddClass, courseValue?: IAddCourse) => void,
    _class: IAddClass,
    _course?: IAddCourse
}

export default ({ updateClass, _class, _course }: ICourseIndexProps) => {

    const handleChangeCourse = (obj?: ISelectData, className?: string, classAbbreviation?: string) => {
        updateClass({
            name: className ?? obj?.key ?? _class.name,
            abbreviation: classAbbreviation ?? _class.abbreviation,
            durationPeriods: _class.durationPeriods,
            startingYear: _class.startingYear
        }, !obj ? _course : {
            name: obj.key,
            id: Number(obj.value)
        });
    }

    const changeData = (e: string) => {
        updateClass(
            {
                name: _class.name,
                abbreviation: _class.abbreviation,
                durationPeriods: _class.durationPeriods,
                startingYear: +e
            }, _course
        )
    }

    const changePeriod = (e: string) => {
        updateClass(
            {
                name: _class.name,
                abbreviation: _class.abbreviation,
                durationPeriods: +e,
                startingYear: _class.startingYear
            }, _course
        )
    }

    return (
        <div className={styles.form_content}>
            <section className={styles.card_page_header}>
                <Text fontSize="lg" fontWeight="bold">{t('createClass.tabIndex.class')}</Text>
            </section>
            <section className={styles.card_page_content}>
                <CourseSelect
                    onChange={(e) => handleChangeCourse(e)}
                />

                <section className={`${styles.dual_input_zone} ${styles.divided_input_2_1}`}>
                    <Input label={t('createClass.courseIndex.className')}
                        value={_class.name}
                        onChange={(e) => handleChangeCourse(undefined, e.target.value)}
                        maxLength={255}
                    />
                    <Input label={t('createClass.courseIndex.abbreviation')}
                        value={_class.abbreviation}
                        onChange={(e) => handleChangeCourse(undefined, undefined, e.target.value)}
                        maxLength={10}
                    />
                </section>
                <section className={`${styles.dual_input_zone} ${styles.divided_input_2_1}`}>
                    <Input
                        label={t('createClass.courseIndex.startingYear')}
                        type="number"
                        value={_class.startingYear}
                        onChange={(e) => changeData(e.target.value)}
                        min={1900}
                        max={2200}
                    />
                    <Input
                        label={t('createClass.courseIndex.periods')}
                        type="number"
                        value={_class.durationPeriods}
                        onChange={(e) => changePeriod(e.target.value)}
                    />
                </section>
            </section>
        </div>
    )
}