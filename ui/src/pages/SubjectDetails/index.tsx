import { useState } from "react"
import Header from "../../components/Header"
import { ISubject } from "../../interfaces/models/ISubject"

import styles from './styles.module.css';
import Text from "../../typography";
import Button from "../../components/Button";
import Icon from "../../components/Icon";
import TableView from "../../components/TableView";
import { AptitudeEnum } from "../../enums/AptitudeEnum";
import { IAvaliationTableProps } from "./interfaces/SubjectDetails.interface";
import AvaliationTable from "./components/AvaliationTable";
import Link from "../../components/Link";
import { useParams } from "react-router-dom";

export default () => {

    const params = useParams();
    const idSubject = params.id;
    

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

    const myAvaliations : IAvaliationTableProps[] = [
        {
            name: 'Prova 01',
            data: {
                competences: [
                    {
                        competenceId:1,
                        weight:1,
                        efficacy: 0.8,
                        description: "Aplicar For"
                    },
                    {
                        competenceId:1,
                        weight:1,
                        efficacy: 0.8,
                        description: "Aplicar ForrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrForrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrr"
                    },
                    {
                        competenceId:1,
                        weight:1,
                        efficacy: 0.8,
                        description: "Aplicar For"
                    },
                    {
                        competenceId:1,
                        weight:1,
                        efficacy: 0.8,
                        description: "Aplicar For"
                    },
                    {
                        competenceId:1,
                        weight:1,
                        efficacy: 0.8,
                        description: "Aplicar For"
                    },
                    {
                        competenceId:1,
                        weight:1,
                        efficacy: 0.8,
                        description: "Aplicar For"
                    },
                ],
                students:[
                    {
                        name: 'irineu', 
                        competencesResult: [
                            {
                                competenceId:1,
                                aptitude: AptitudeEnum.APT
                            }
                        ]
                    },
                    {
                        name: 'Jonas', 
                        competencesResult: [
                            {
                                competenceId:1,
                                aptitude: AptitudeEnum.INAPT
                            }    
                        ]
                    },
                    {
                        name: 'Josias', 
                        competencesResult: [
                            {
                                competenceId:1,
                                aptitude: AptitudeEnum.DEVELOPMENT
                            }    
                        ]
                    },
                    {
                        name: 'Josias', 
                        competencesResult: [
                            {
                                competenceId:1,
                                aptitude: AptitudeEnum.DEVELOPMENT
                            }    
                        ]
                    },
                    {
                        name: 'Josias', 
                        competencesResult: [
                            {
                                competenceId:1,
                                aptitude: AptitudeEnum.DEVELOPMENT
                            }    
                        ]
                    },
                    {
                        name: 'Josias', 
                        competencesResult: [
                            {
                                competenceId:1,
                                aptitude: AptitudeEnum.DEVELOPMENT
                            }    
                        ]
                    }
                ]

            }
        }
    ]

    const getData = () => {

    }

    

    return (
        <>
            <Header />
            <main>

                <section className={`${styles.title_section} ${styles.align}`}>
                    <Text fontSize="xl2" fontWeight="bold">{subject.name}</Text>
                    <Text>{subject.class?.name}</Text>
                </section >


                <section>
                    <span>
                        <div className={`${styles.section_header}`}>
                            <Text fontSize="xl2" fontWeight="bold" >
                                Avaliações
                            </Text>
                            <Link to={`/class/subject/${idSubject}/new-test`}>
                                <Button variant="primary_icon"><Icon name="add" /></Button>
                            </Link>
                        </div>

                        {
                            myAvaliations.map((e) => 
                            (
                                <AvaliationTable {...e} />
                            ))
                        }
                    </span>
                </section>


                <section>
                    <div className={`${styles.section_header}`}>
                        <Text fontSize="xl2" fontWeight="bold" >
                            Objetivos
                        </Text>
                    </div>
                    <TableView 
                        data={
                            subject.objectives!.map((e) => 
                            {
                                return {
                                    desbription: e.identification
                                }
                            })
                        } 
                        hasNotation={true}
                        hasOptions={false}
                    />
                </section>
            </main>
        </>

    )
}