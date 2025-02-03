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
import { IStudentData, IUserData } from "./interfaces/UserProfile.interface";
import { useNavigate, useSearchParams } from "react-router-dom";
import { toast } from "react-toastify";
import getHex from "@/constants/getHex";
import { useUserContext } from "@/contexts/user.context";
import Divider from "@/components/Divider";
import FeedbackCard from "@/components/FeedbackCard";
import PositionCard from "./components/PositionCard";
import FeedbackModal from "./components/FeedbackModal";

interface IModalProps {
    feedbackId?: number
    isFeedbackModalOpen: boolean
}

const UserProfile = () => {

    const [searchParams] = useSearchParams();
    const classId = searchParams.get("classId");
    const userId = searchParams.get("userId");

    const { user } = useUserContext();

    const navigate = useNavigate();

    const [userData, setUserData] = useState<IUserData>();
    const [studentData, setStudentData] = useState<IStudentData>();


    const [modalProps, setModalProps] = useState<IModalProps>({
        isFeedbackModalOpen: false
    })


    const getData = async () => {
        const response = await internalAPI.jsonRequest(`/users/profile?${!userId || new URLSearchParams({ id: userId })}`, "GET");

        if (!response || response.statusCode != 200) {
            if (!toast.isActive("profile-load-error"))
                toast.error("Something went wrong.", { toastId: "profile-load-error" });
            navigate("/home");
        }

        const content = response.data;

        setStudentData(content.student);
        setUserData({
            id: content.id,
            name: content.name,
            identification: content.identification,
            birthday: content.birthday,
            position: content.position,
            sector: content.sector,
        });

        console.log(content)
    }
    useEffect(() => {
        getData();
    }, []);

    return (
        <>
            <Header />
            <main>
                {
                    classId ?
                        <SectionHeader links={[{
                            label: "Classes Overview",
                            goTo: "/classes"
                        },
                        {
                            label: studentData?.className!,
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
                                label: "User Profile"
                            }]} />
                }
                <section className={`${styles.section}`}>
                    <div className={`${styles.space_between}`}>
                        <div className={`${styles.spacing}`}>
                            <div className={`${styles.gap}`}>
                                <Text variant="span" fontWeight="bold" fontSize="xl2">{userData?.name}</Text>
                                <Text>{userData?.identification}</Text>

                            </div>
                            {
                                studentData &&
                                <Text fontSize="md" fontWeight="semibold" >{"From " + studentData?.className}</Text>
                            }
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
                    {
                        studentData?.classPosition &&
                        <>
                            <PositionCard name={userData?.name!} position={studentData.classPosition} score={studentData.performance} />
                            <Divider size="big" />
                        </>
                    }
                    {
                        studentData &&
                        <>
                            <div className={`${styles.section_header}`}>
                                <Text variant="span" fontWeight="bold" fontSize="xl2">Feedbacks</Text>
                                {
                                    user?.permissionLevel == 2 && user.id != userData?.id &&
                                    <Button
                                        className={`${styles.addBtn} ${styles.align}`}
                                        onClick={() => setModalProps({
                                            feedbackId: undefined,
                                            isFeedbackModalOpen: true
                                        })} >
                                        <Icon name="add" size="md" />
                                    </Button>
                                }
                            </div>
                            {
                                studentData?.subjectFeedBacks.length! > 0 &&
                                <section className={`${styles.feedbacks}`}>
                                    <Text fontSize="lg" fontWeight="bold">Subject Feedbacks</Text>
                                    {
                                        studentData?.subjectFeedBacks.map(f => (
                                            <FeedbackCard
                                                color={getHex(f.subject)}
                                                title={f.subject}
                                                subtitle={"Last update • " + formatDate(f.updatedAt) + " by " + f.instructor} content={f.content}
                                                editButton={
                                                    user?.permissionLevel == 2 ?
                                                        {
                                                            label: "Edit Feedback",
                                                            action: () => setModalProps({
                                                                feedbackId: f.id,
                                                                isFeedbackModalOpen: true
                                                            })
                                                        } : undefined
                                                }
                                            />
                                        ))
                                    }
                                </section>
                            }
                            {
                                user?.permissionLevel == 2 && studentData?.feedbacks.length! > 0 &&
                                <section className={`${styles.feedbacks}`}>
                                    <Text fontSize="lg" fontWeight="bold">Personal Feedbacks</Text>
                                    {
                                        studentData?.feedbacks.map(f => (
                                            <FeedbackCard
                                                color={getHex(f.instructor)}
                                                title={f.instructor}
                                                subtitle={"Last update • " + formatDate(f.updatedAt)}
                                                editButton={
                                                    user?.permissionLevel == 2 && user?.id == f.instructorId ?
                                                        {
                                                            label: "Edit Feedback",
                                                            action: () => { }
                                                        } : undefined
                                                }
                                                content={f.content}
                                            />
                                        ))
                                    }
                                </section>
                            }
                        </>
                    }
                </section>
                {
                    studentData &&
                    <FeedbackModal
                        isOpen={modalProps.isFeedbackModalOpen}
                        handleIsOpen={() => setModalProps({
                            feedbackId: undefined,
                            isFeedbackModalOpen: false
                        })}
                        feedbackId={modalProps.feedbackId}
                        classId={studentData.classId}
                        userName={userData?.name!}
                        className={studentData.className}
                        studentId={studentData.id} />
                }
            </main>
        </>
    )
}

export default UserProfile;