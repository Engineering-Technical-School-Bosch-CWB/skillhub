import { AptitudeEnum } from "../../../enums/AptitudeEnum"

interface Competence {
    competenceId: number,
    weight: number,
    efficacy: number,
    description: string
}

interface CompetenceResult {
    competenceId: number,
    aptitude: AptitudeEnum
}

interface StudentAvaliationData {
    name: string,
    competencesResult: CompetenceResult[]
}

interface AvaliationData {
    competences: Competence[],
    students: StudentAvaliationData[]
}

export interface IAvaliationTableProps {
    name: string,
    data: AvaliationData
}