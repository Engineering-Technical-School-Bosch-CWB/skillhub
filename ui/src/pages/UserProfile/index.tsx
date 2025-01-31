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
import { IStudentData, IUserData } from "./interfaces/AprenticesProfile.interface";
import { useNavigate, useSearchParams } from "react-router-dom";
import { toast } from "react-toastify";
import getHex from "@/constants/getHex";
import { useUserContext } from "@/contexts/user.context";
import Divider from "@/components/Divider";

const UserProfile = () => {

    const [searchParams] = useSearchParams();
    const classId = searchParams.get("classId");
    const userId = searchParams.get("userId");

    const { user } = useUserContext();

    const navigate = useNavigate();

    const [student, setStudent] = useState<IStudentData>();
    const [userData, setUserData] = useState<IUserData>();

    const getData = async () => {
        const response = await internalAPI.jsonRequest(`/users/profile?${!userId || new URLSearchParams({ id: userId })}`, "GET");

        if (!response || response.statusCode != 200) {
            if (!toast.isActive("profile-load-error"))
                toast.error("Something went wrong.", { toastId: "profile-load-error" });
            navigate("/home");
        }

        const content = response.data;

        setStudent(content.student);
        setUserData({
            id: content.id,
            name: content.name,
            identification: content.identification,
            birthday: content.birthday,
            position: content.position,
            sector: content.sector,
        });
    }
    useEffect(() => {
        getData();
    }, []);

    return (
        <>
            <Header />
            <main>
                {/* <ReturnButton /> */}
                {
                    classId ?
                        <SectionHeader links={[{
                            label: "Classes Overview",
                            goTo: "/classes"
                        },
                        {
                            label: student?.className!,
                            goTo: `/classes/${classId}`
                        },
                        {
                            label: userData?.name!
                        }]} />
                        : userId ?
                            <SectionHeader links={[{
                                label: "Users Overview",
                                goTo: "/users"
                            },
                            {
                                label: userData?.name!
                            }]} />
                            :
                            <SectionHeader links={[{
                                label: userData?.name!
                            }]} />
                }
                <section className={`${styles.section}`}>
                    <div className={`${styles.space_between}`}>
                        <div className={`${styles.spacing}`}>
                            <div className={`${styles.gap}`}>
                                <Text variant="span" fontWeight="bold" fontSize="xl2">{userData?.name}</Text>
                                <Text>{userData?.identification}</Text>

                            </div>
                            <Text fontSize="md" fontWeight="semibold" >{"From " + student?.className}</Text>
                        </div>
                        <Button variant="primary_icon"><Icon name="settings" /></Button>
                    </div>
                    <div className={`${styles.gap}`}>
                        <Avatar src={"/avatar.png"} size="xl" />
                        <div className={`${styles.spacing}`}>
                            <Text fontSize="lg" fontWeight="bold" >{userData?.position + " - " + userData?.sector}</Text>
                            <Text>{!userData?.birthday ? "Missing birth date..." : "Birthday: " + formatDate(userData.birthday)}</Text>

                        </div>
                    </div>
                    {/* <ProfileCard {...data.student} /> */}
                </section>
                <section className={`${styles.section}`}>
                    <Divider size="big" />
                    <div className={`${styles.section_header}`}>
                        <Text variant="span" fontWeight="bold" fontSize="xl2">Feedbacks</Text>
                        <Button className={`${styles.addBtn} ${styles.align}`} >
                            <Icon name="add" size="md" />
                        </Button>
                    </div>
                    {
                        student?.subjectFeedBacks.length! > 0 &&
                        <section className={`${styles.feedbacks}`}>
                            <Text fontSize="lg" fontWeight="bold">Subject Feedbacks</Text>
                            {
                                student?.subjectFeedBacks.map(f => (
                                    <div className={`${styles.identificationCard}`}>
                                        <div className={`${styles.space_between}`}>
                                            <section className={`${styles.align}`}>
                                                <section className={`${styles.identificationCardMarker}`} style={{ backgroundColor: getHex(f.subject) }}></section>
                                                <section className={`${styles.cardContent}`}>
                                                    <Text fontWeight="bold">
                                                        {f.subject}
                                                    </Text>
                                                    <Text fontWeight="semibold" fontSize="xs">
                                                        {"Last update • " + formatDate(f.updatedAt) + " by " + f.instructor}
                                                    </Text>
                                                </section>
                                            </section>
                                            {
                                                user?.permissionLevel == 2 &&
                                                <section>
                                                    <div className={`${styles.align}`}>
                                                        <span className={`${styles.subtitle} ${styles.evBtn}`}>
                                                            <Text fontSize="sm">Edit Feedback</Text>
                                                            <Icon name={"edit"} />
                                                        </span>
                                                    </div>
                                                </section>
                                            }
                                        </div>
                                        <Text>{f.content}</Text>
                                    </div>
                                ))
                            }
                        </section>
                    }
                    {
                        user?.permissionLevel == 2 && student?.feedbacks.length! > 0 &&
                        <section className={`${styles.feedbacks}`}>
                            <Text fontSize="lg" fontWeight="bold">Personal Feedbacks</Text>
                            {
                                student?.feedbacks.map(f => (
                                    <div className={`${styles.identificationCard}`}>
                                        <div className={`${styles.space_between}`}>
                                            <section className={`${styles.align}`}>
                                                <section className={`${styles.identificationCardMarker}`} style={{ backgroundColor: getHex(f.instructor) }}></section>
                                                <section className={`${styles.cardContent}`}>
                                                    <Text fontWeight="bold">
                                                        {f.instructor}
                                                    </Text>
                                                    <Text fontWeight="semibold" fontSize="xs">
                                                        {"Last update • " + formatDate(f.updatedAt)}
                                                    </Text>
                                                </section>
                                            </section>
                                            {
                                                user?.permissionLevel == 2 && user?.id == f.instructorId &&
                                                <section>
                                                    <div className={`${styles.align}`}>
                                                        <span className={`${styles.subtitle} ${styles.evBtn}`}>
                                                            <Text fontSize="sm">Edit Feedback</Text>
                                                            <Icon name={"edit"} />
                                                        </span>
                                                    </div>
                                                </section>
                                            }
                                        </div>
                                        <Text>{f.content}</Text>
                                    </div>
                                ))
                            }
                        </section>
                    }
                </section>
            </main>
        </>
    )
}

export default UserProfile;