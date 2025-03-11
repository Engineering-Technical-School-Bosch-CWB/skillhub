import Text from "../../typography";
import Icon from "@/components/Icon";
import styles from './styles.module.css';
import Avatar from "@/components/Avatar";
import Button from "@/components/Button";
import Header from "../../components/Header";
import formatDate from "@/constants/formatDate";
import internalAPI from "@/service/internal.services";
import SectionHeader from "@/components/SectionHeader";
import getHex from "@/constants/getHex";
import Divider from "@/components/Divider";
import FeedbackCard from "@/components/FeedbackCard";
import PositionCard from "./components/PositionCard";
import FeedbackModal from "./components/FeedbackModal";
import Progress from "@/components/Progress";
import ImageUploadCard from "@/components/ImageUploadCard";
import UpdateProfileModal from "./components/UpdateProfileModal";

import { IStudentData, IStudentProfileData, IUserData } from "./interfaces/UserProfile.interface";
import { useEffect, useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { toast } from "react-toastify";
import { useUserContext } from "@/contexts/user.context";
import { Bar, BarChart, Legend, PolarAngleAxis, PolarGrid, PolarRadiusAxis, Radar, RadarChart, ResponsiveContainer, Tooltip, TooltipProps, XAxis, YAxis } from "recharts";
import { NameType, ValueType } from "recharts/types/component/DefaultTooltipContent";

interface IModalProps {
    feedbackId?: number
    isFeedbackModalOpen: boolean
}
interface IRadarProps {
    subject: string,
    A: number,
    B?: number,
    fullMark: number
}
interface IBarProps {
    name: string
    grade: number
    aptitude?: number
    obj?: number
    fullMark: number
}

const CustomTooltip = ({
    active,
    payload,
    label,
}: TooltipProps<ValueType, NameType>) => {
    if (active) {
        return (
            <div className={`${styles.custom_tooltip}`}>
                <Text fontWeight="semibold">{`${label}`}</Text>
                <Text fontSize="sm">{`Grade : ${payload?.[0].value == null ? "-" : (payload?.[0].value as number).toFixed(2)}`}</Text>
                <Text fontSize="sm">{`Aptitude : ${payload?.[1].payload.obj == null ? "-" : payload?.[1].payload.obj.toFixed(2)}`}</Text>
            </div>
        );
    }

    return null;
};

const UserProfile = () => {

    const [loading, setLoading] = useState(true);
    const [radarData, setRadarData] = useState<IRadarProps[]>([]);
    const [barData, setBarData] = useState<IBarProps[]>([]);
    const [editModal, setEditModal] = useState(false);
    const [editImageModal, setEditImageModal] = useState(false);
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

        if (!response.success) {
            if (!toast.isActive("profile-load-error"))
                toast.error("Something went wrong.", { toastId: "profile-load-error" });
            navigate("/home");
        }

        const content = response.data as IStudentProfileData;
        
        setStudentData(content.student);
        setUserData({
            id: content.id,
            name: content.name,
            identification: content.identification,
            birthday: content.birthday,
            position: content.position,
            sector: content.sector,
            profilePicture: content.profilePicture,
            isArchived: content.isArchived
        });

        if (content.student) {
            setRadarData(content.student.subjectAreaResults.map((result) => {
                const item: IRadarProps = {
                    A: !result.grade ? 0 : Number(result.grade.toFixed(2)),
                    subject: result.name,
                    fullMark: 100,
                    B: 0
                }
                return item
            }))

            setBarData(content.student.subjectResults.map((result) => {
                const item: IBarProps = {
                    grade: result.grade ?? 0,
                    aptitude: ((result.aptitude ?? 0) - (result.grade ?? 0)) > 0 ?
                        ((result.aptitude ?? 0) - (result.grade ?? 0)) : 0,
                    obj: result.aptitude ?? 0,
                    fullMark: 100,
                    name: result.name
                };
                return item;
            }));

        }
        setLoading(false);
    }
    useEffect(() => {
        getData();
    }, []);

    if (loading)
        return (
            <>
                <Header />
                <Progress />
            </>
        )

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
                                    <Text>{userData?.isArchived? "(Archived)":""}</Text>
                            </div>
                            {
                                studentData &&
                                <Text fontSize="md" fontWeight="semibold" >{"From " + studentData?.className}</Text>
                            }
                        </div>
                        <Button variant="primary_icon" onClick={() => setEditModal(true)}><Icon name="settings" /></Button>
                    </div>
                    <div className={`${styles.gap}`}>
                        <div>
                            <Avatar 
                                src={userData?.profilePicture?.mUrl || "./avatar.png"} 
                                size="xl" 
                                onEditClick={() => setEditImageModal(true)} 
                            />
                        </div>
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
                            <div className={`${styles.chart_section}`}>
                                <div className={`${styles.row}`}>
                                    <PositionCard name={userData?.name!} position={studentData.classPosition} score={studentData.performance} />
                                    <div className={`${styles.chart_container}`}>
                                        <Text>Content Area</Text>
                                        <RadarChart
                                            cx={300}
                                            cy={200}
                                            outerRadius={130}
                                            width={600}
                                            height={350}
                                            data={radarData}
                                        >
                                            <PolarGrid />
                                            <PolarAngleAxis dataKey="subject" />
                                            <PolarRadiusAxis />
                                            <Tooltip />
                                            <Radar
                                                name={userData?.name}
                                                dataKey="A"
                                                stroke="#00629a"
                                                fill="#00629a"
                                                fillOpacity={0.6}
                                            />
                                        </RadarChart>
                                    </div>
                                </div>
                                <div className={`${styles.chart_container}`}>
                                    <Text>Subjects</Text>
                                    <ResponsiveContainer width={"100%"} height={350}>
                                        <BarChart
                                            data={barData}
                                            margin={{
                                                top: 20,
                                                right: 30,
                                                left: 20,
                                                bottom: 5,
                                            }}
                                        >
                                            <XAxis dataKey={"name"} fontSize={10} />
                                            <YAxis domain={[0, 100]} />
                                            <Tooltip content={<CustomTooltip />} />
                                            <Legend />
                                            <Bar dataKey="grade" stackId="a" fill="#00629a" />
                                            <Bar dataKey="aptitude" stackId="a" fill="#0197ee" />
                                        </BarChart>

                                    </ResponsiveContainer>
                                </div>
                            </div>

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
                                                    user?.permissionLevel == 2 && user.id != userData?.id ?
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
                                                isPrivate={!f.studentMayVisualize}
                                                editButton={
                                                    user?.permissionLevel == 2 && user?.id == f.instructorId ?
                                                        {
                                                            label: "Edit Feedback",
                                                            action: () => setModalProps({
                                                                feedbackId: f.id,
                                                                isFeedbackModalOpen: true
                                                            })
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
                        userName={userData?.name!}
                        studentData={studentData}
                        setStudentData={setStudentData} />
                }
            </main>
            {
                userData &&
                <UpdateProfileModal
                    open={editModal}
                    handleClose={() => setEditModal(false)}
                    title="Edit Profile"
                    isCurrentUser={!userId}
                />
            }
            {
                editImageModal &&
                <ImageUploadCard 
                    userId={userData?.id ?? 0 } 
                    handleClose={() => setEditImageModal(false)} 
                    open={editImageModal} 
                    title="Profile Image" 
                    userThumb={userData?.profilePicture?.gUrl ?? "./avatar.png"}
                /> 
            }
        </>
    )
}

export default UserProfile;