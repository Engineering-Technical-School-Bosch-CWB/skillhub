import { useState } from "react";
import Header from "../../components/Header";
import ReturnButton from "../../components/ReturnButton";
import ProfileCard from "./components/ProfileCard";
import {  IStudentProfileData } from "./interfaces/AprenticesProfile.interface";

import styles from './styles.module.css';
import Text from "../../typography";

export default () => {
    
    const [data, setStudent] = useState<IStudentProfileData>({
        student: {
            name:"Joãosinho da silva",
            userId: 1,
            class:{
                name: "Digital Talent Academy 2022"
            }
        },
        personalFeedbacks: [],
        subjectFeedbacks: [],
        ranking: {
            exploitation: 98,
            position: 2
        }
    })


    return (
        <>
            <Header/> 
            <main>
                <ReturnButton />
                <ProfileCard {...data.student} /> 
                <section className={`${styles.chart_section} ${styles.align}`}>
                    <div className={`${styles.student_highlight} ${styles.align}`}>
                        <Text fontSize="lg">Highlights</Text>
                        
                    </div>
                    <div></div>
                </section>
            </main>
        </>
    )
}