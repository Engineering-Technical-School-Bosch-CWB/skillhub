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

const Birthdays = () => {

    const navigate = useNavigate();

    const [currentMonth, setCurrentMonth] = useState(new Date().getMonth() + 1);
    const [students, setStudents] = useState<IStudentCardProps[]>([]);

    const months = [
        "January", "February", "March", "April", "May", "June",
        "July", "August", "September", "October", "November", "December"
    ];

    const getData = async () => {   
        const response = await internalAPI.jsonRequest(`/users/paginated?${new URLSearchParams({birthMonth: String(currentMonth)})}`, 'GET')
        
        if (!response || response.statusCode != 200) {
            if (!toast.isActive('results-load-error'))
                toast.error('Something went wrong.', { toastId: 'results-load-error' });
            navigate('/home');
        }

        const content = response.data;
        console.log(content)
        setStudents(content.map((s: { id: number; name: string; birthday: string; identification: string; }) => ({
            id: s.id,
            name: s.name,
            birthday: s.birthday,
            identification: s.identification
        })))
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

    return (
        <>
            <Header />
            <main>
                <SectionHeader links={[{label: "Birthdays"}]} />
                <div className={styled.birthday_title}>
                    <Text variant="span" fontWeight="bold" fontSize="xl2">Birthdays</Text>
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
                        <Text variant="span" fontSize="sm">No birthdays</Text>
                        :
                        students.map(s => {
                            return (
                                <StudentCard key={s.id} id={s.id} name={s.name} birthday={s.birthday} identification={s.identification} goTo='' />
                            )
                        })
                    }
                </div>
            </main>
        </>
    )
}

export default Birthdays;