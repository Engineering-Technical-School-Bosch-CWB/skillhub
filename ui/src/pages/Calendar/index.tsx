import Header from "@/components/Header";
import SectionHeader from "@/components/SectionHeader";
import { months } from "@/constants/Date";
import Text from "@/typography";
import { t } from "i18next";
import { useState } from "react";

import styles from './styles.module.css';
import SelectView from "./Components/SelectView";

export type ViewKind = "instructor" | "class";

const Calendar = () => {
    const [currentView, setCurrentView] = useState<ViewKind>("instructor");
    const [today, _] = useState<Date>(new Date())

    const [month, setMonth] = useState<number>(today.getMonth());
    const [year, setYear] = useState<number>(today.getFullYear());

    const toggleNextMonth = () => {
        const isLimit: boolean = month >= 11;
        setMonth(isLimit? 0 : (month + 1))
        if(isLimit) setYear(year + 1);
    }
    const togglePrevMonth = () => {
        const isLimit: boolean = month <= 0;
        setMonth(isLimit? 11 : (month - 1))
        if(isLimit) setYear(year - 1);
    }


    return (
        <>
            <Header /> 

            <main>
                <SectionHeader links={[{label: "Calendar" }]} /> 

                <div className={styles.calendar_header}>
                    <Text fontSize="lg" fontWeight="bold" >
                        {t("calendar.title")}
                    </Text>
                    <SelectView currentYear={year} monthPrevious={togglePrevMonth} currentMonth={months[month]} monthForward={toggleNextMonth} currentView={currentView} setSelectedView={setCurrentView} />
                </div>
                
                <section className={styles.content_container}>
                    <aside>
                        
                        <h2>aside</h2>
                    </aside>
                    <span className={styles.divider}></span>
                    <section className={styles.content}>
                        content
                    </section>
                </section>

            </main>
        </>
    )
}

export default Calendar;