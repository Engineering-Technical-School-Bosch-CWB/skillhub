import { useState } from "react"
import Header from "../../components/Header"
import { ISubject } from "../../interfaces/models/ISubject"

import styles from './styles.module.css';
import Text from "../../typography";
import Button from "../../components/Button";
import Icon from "../../components/Icon";

export default () => {

    const [subject, setSubject] = useState<ISubject>({
        classId:1,
        curricularUnitId:1,
        duration:10,
        instructorId:1,
        name:"Lógica de Programação",
        period:1,
        class: {
            name: 'Digital Talent Academy 2022',
            course: {
                abbreviation: 'DTA',
                name: 'Digital Talent Academy',
                id: 1
            },
            idCourse: 1,
            id:1
        },
        objectives: [
            {
                evaluationCriteria: "",
                identification: "Utilizar entrada e saída de informações",
                ressources: "",
                subjectId: 1,
                time: 20,
            },
            {
                evaluationCriteria: "",
                identification: "Aplicar funções aritméticas",
                ressources: "",
                subjectId: 2,
                time: 30,
            },
            {
                evaluationCriteria: "",
                identification: "Aplicar transformando tipos de dados com funções embutidas",
                ressources: "",
                subjectId: 3,
                time: 40,
            }
        ]
        
    })

    const getData = () => {

    }



    return (
        <div>
            <Header />

            <section className={`${styles.title_section} ${styles.align}`}>
                <Text fontSize="xl2" fontWeight="bold">{subject.name}</Text>
                <Text>{subject.class?.name}</Text>
            </section >


            <section>
                <span>
                    <Text>Avaliações</Text>
                    <Button><Icon name="add" /></Button>
                </span>
            </section>


            <section>
                <Text>Objetivos</Text>
                <>
                    <br />
                    <Text>#</Text>
                    <Text> Descrição</Text>
                    <br />
                </>
                {
                    subject.objectives?.map((e, index) => (
                        <>
                            <Text>{index}</Text>
                            <Text>{e.identification}</Text>
                            <br />
                        </>
                    ))
                }

            </section>
        </div>
    )
}