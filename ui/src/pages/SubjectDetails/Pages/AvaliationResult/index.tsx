import { useParams } from "react-router-dom"
import Header from "../../../../components/Header"
import { IAvaliationTableProps } from "../../interfaces/SubjectDetails.interface";
import StudentCompetences from "./components/StudentCompetences";
import { AptitudeEnum } from "../../../../enums/AptitudeEnum";

export default () => {
    const params = useParams();

    // const test 

    const myAvaliations : IAvaliationTableProps[] = [
        {
            idTest: 2,
            name: 'Prova 02',
            date: new Date()
        },
        {
            idTest: 1,
            name: 'Prova 01',
            date: new Date(),
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
                        description: "Aplicar for"
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

    return( 
        <>
            <Header /> 
            <main>
                <StudentCompetences {...myAvaliations[1]} />
            </main>
        </>
    )
}