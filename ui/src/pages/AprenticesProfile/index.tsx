import Text from "../../typography";
import Icon from "@/components/Icon";
import styles from './styles.module.css';
import Avatar from "@/components/Avatar";
import Button from "@/components/Button";
import Header from "../../components/Header";
import formatDate from "@/constants/formatDate";
import internalAPI from "@/service/internal.services";
import SectionHeader from "@/components/SectionHeader";

import { useEffect, useState } from "react";
import { IStudentData } from "./interfaces/AprenticesProfile.interface";
import { useNavigate, useParams } from "react-router-dom";
import { toast } from "react-toastify";

const ApprenticesProfile = () => {

    const { classId, studentId } = useParams();

    const navigate = useNavigate();

    const [student, setStudent] = useState<IStudentData>();

    const getData = async () => {
        const response = await internalAPI.jsonRequest(`/students/${studentId}`, "GET");

        if (!response || response.statusCode != 200) {
            if (!toast.isActive("profile-load-error"))
                toast.error("Something went wrong.", { toastId: "profile-load-error" });
            navigate("/home");
        }

        const content = response.data;

        setStudent({
            id: content.id,
            userId: content.userId,
            name: content.name,
            identification: content.identification,
            birthday: content.birthday,
            className: content.className,
            classPosition: content.classPosition,
            performance: content.performance,
            position: content.position,
            sector: content.sector,
        })

        console.log(content);
    }

    const [data, setData] = useState({
        student: {
            name: "Joãosinho da silva",
            userId: 1,
            class: {
                id: 1,
                name: "DTA 1",
                startingYear: 2023
            }
        },
        personalFeedbacks: [],
        subjectFeedbacks: [],
        ranking: {
            exploitation: 98,
            position: 2
        }
    })

    useEffect(() => {
        getData();
    }, []);

    return (
        <>
            <Header />
            <main>
                {/* <ReturnButton /> */}
                <SectionHeader links={[{
                    label: "Classes Overview",
                    goTo: "/classes"
                },
                {
                    label: data.student.class.name + " - " + data.student.class.startingYear,
                    goTo: `/classes/${classId}`
                },
                {
                    label: student?.name!
                }]} />
                <section className={`${styles.section}`}>
                    <div className={`${styles.space_between}`}>
                        <div className={`${styles.spacing}`}>
                            <div className={`${styles.gap}`}>
                                <Text variant="span" fontWeight="bold" fontSize="xl2">{student?.name}</Text>
                                <Text>{student?.identification}</Text>

                            </div>
                            <Text fontSize="md" fontWeight="semibold" >{"From " + student?.className}</Text>
                        </div>
                        <Button variant="primary_icon"><Icon name="settings" /></Button>
                    </div>
                    <div className={`${styles.gap}`}>
                        <Avatar src={"/avatar.png"} size="xl" />
                        <div className={`${styles.spacing}`}>
                            <Text fontSize="lg" fontWeight="bold" >{student?.position + " - " + student?.sector}</Text>
                            <Text>{!student?.birthday ? "---" : formatDate(student.birthday)}</Text>

                        </div>
                    </div>
                    {/* <ProfileCard {...data.student} /> */}
                    <section className={`${styles.chart_section} ${styles.align}`}>
                        <div className={`${styles.student_highlight} ${styles.align}`}>
                            <Text fontSize="lg">Highlights</Text>

                        </div>
                        <div></div>
                    </section>
                </section>

            </main>
        </>
    )
}

export default ApprenticesProfile;