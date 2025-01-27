import Header from "../../../../components/Header"
import { IAvaliationTableProps } from "../../interfaces/SubjectDetails.interface";
import StudentCompetences from "./components/StudentCompetences";
import { AptitudeEnum } from "../../../../enums/AptitudeEnum";
import ReturnButton from "../../../../components/ReturnButton";

export default () => {
    //! const params = useParams();


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
                students: [
                    {
                        userId: 1,
                        name: "joao 1",
                        competences: [
                            {
                                weight: 1,
                                aptitude: AptitudeEnum.APT,
                                skill: {
                                    curricularUnitId:1,
                                    description: "Aplicar for",
                                    evaluationCriteria: "",
                                }
                            },
                            {
                                weight: 2,
                                skill: {
                                    curricularUnitId:1,
                                    description: "Aplicar for",
                                    evaluationCriteria: "",
                                }
                            }
                        ]
                    },
                    {
                        userId: 2,
                        name: "irineu 2",
                        competences: [
                            {
                                weight: 1,
                                skill: {
                                    curricularUnitId:1,
                                    description: "Aplicar for",
                                    evaluationCriteria: "",
                                }
                            },
                            {
                                weight: 2,
                                skill: {
                                    curricularUnitId:1,
                                    description: "Aplicar for",
                                    evaluationCriteria: "",
                                }
                            }
                        ]
                    },
                    {
                        userId: 3,
                        name: "irineu 3",
                        competences: [
                            {
                                weight: 1,
                                skill: {
                                    curricularUnitId:1,
                                    description: "Aplicar for",
                                    evaluationCriteria: "",
                                }
                            },
                            {
                                weight: 2,
                                skill: {
                                    curricularUnitId:1,
                                    description: "Aplicar for",
                                    evaluationCriteria: "",
                                }
                            }
                        ]
                    },
                    {
                        userId: 4,
                        name: "irineu 4",
                        competences: [
                            {
                                weight: 1,
                                skill: {
                                    curricularUnitId:1,
                                    description: "Aplicar for",
                                    evaluationCriteria: "",
                                }
                            },
                            {
                                weight: 2,
                                skill: {
                                    curricularUnitId:1,
                                    description: "Aplicar for",
                                    evaluationCriteria: "",
                                }
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
            <ReturnButton/>
                <StudentCompetences {...myAvaliations[1]} />
            </main>
        </>
    )
}