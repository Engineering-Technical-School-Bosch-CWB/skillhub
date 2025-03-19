import styled from './styles.module.css'
import Header from '../../components/Header'
import StudentCard from '../../components/StudentCard';
import Text from '../../typography';
import { IStudentCardProps } from '../../components/StudentCard/interfaces/IStudentCard.interfaces'
import { useEffect, useState } from 'react';
import internalAPI from '../../service/internal.services';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';
import Button from '../../components/Button';
import SectionHeader from '@/components/SectionHeader';
import IImage from '@/interfaces/models/IImage';
import Progress from '@/components/Progress';
import { useUserContext } from "../../contexts/user.context";
import { t } from 'i18next';

const Birthdays = () => {

    const { user } = useUserContext();

    const [loading, setLoading] = useState(true);

    const navigate = useNavigate();

    const [currentMonth, setCurrentMonth] = useState(new Date().getMonth() + 1);
    const [students, setStudents] = useState<IStudentCardProps[]>([]);

    const months = [
        t('birthdays.january'), t('birthdays.february'), t('birthdays.march'), t('birthdays.april'), 
        t('birthdays.may'), t('birthdays.june'), t('birthdays.july'), t('birthdays.august'), 
        t('birthdays.september'), t('birthdays.october'), t('birthdays.november'), t('birthdays.december')
    ];

    const getData = async () => {
        const response = await internalAPI.jsonRequest(`/users/birthdays?${new URLSearchParams({ birthMonth: String(currentMonth) })}`, 'GET')

        if (!response.success) {
            if (!toast.isActive('results-load-error'))
                toast.error('Something went wrong.', { toastId: 'results-load-error' });
            navigate('/home');
        }

        const content = response.data;

        setStudents(content.map((s: { id: number; name: string; birthday: string; profilePicture?: IImage; position: string; group: string; classId: number }) => ({
            id: s.id,
            name: s.name,
            birthday: s.birthday,
            image: s.profilePicture?.mUrl,
            position: s.position,
            group: s.group,
            classId: s.classId
        })));

        setLoading(false);
    }

    useEffect(() => {
        getData();
    }, [currentMonth])

    const handlePreviousMonth = () => {
        setCurrentMonth(prevMonth => prevMonth == 1 ? 12 : prevMonth - 1);
    }

    const handleNextMonth = () => {
        setCurrentMonth(nextMonth => nextMonth == 12 ? 1 : nextMonth + 1);
    }

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
                <SectionHeader links={[{ label: t('birthdays.birthdays') }]} />
                <div className={styled.birthday_title}>
                    <Text variant="span" fontWeight="bold" fontSize="xl2">{t('birthdays.birthdays')}</Text>
                </div>
                <div className={styled.month_title}>
                    <Button onClick={handlePreviousMonth}>{'<'}</ Button>
                    <div className={styled.month_name}>
                        <Text variant='span' fontWeight='bold' fontSize='xl2'>{months[currentMonth - 1]}</Text>
                    </div>
                    <Button onClick={handleNextMonth}>{'>'}</ Button>
                </div>
                <div className={styled.body_content}>
                    {
                        students.length == 0
                            ?
                            <Text variant="span" fontSize="sm">{t('birthdays.noData')}</Text>
                            :
                            students.map(s => {
                                //const goTo = "/user-profile?classId=" + s.classId + "&userId=" + s.id
                                //const goTo = user?.permissionLevel === 2 ? "aaa" : "";
                                let identification = s.position === "Aprendiz" ? s.group : s.position;
                                let goTo;
                                if(user?.permissionLevel===2) {
                                    goTo = s.position==="Aprendiz" ?
                                        "/user-profile?classId=" + s.classId + "&userId=" + s.id :
                                        "/user-profile?userId=" + s.id 
                                }
                                else {
                                    goTo = ""
                                }

                                return (
                                    <StudentCard
                                        key={s.id} id={s.id}
                                        name={s.name}
                                        identification={identification}
                                        shortBirthday={s.birthday}
                                        goTo={goTo} image={s.image}
                                    />
                                    
                                )
                            }) 
                    }
                </div>
            </main>
        </>
    )
}

export default Birthdays;