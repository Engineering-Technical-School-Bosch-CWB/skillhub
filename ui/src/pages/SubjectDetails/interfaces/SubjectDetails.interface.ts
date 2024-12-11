import { AptitudeEnum } from "../../../enums/AptitudeEnum"
import { StudentsCompetences } from "../Pages/AvaliationResult/components/StudentCompetences/interfaces/StudentCompetences.interface"

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

export interface StudentAvaliationData {
    name: string,
    competencesResult: CompetenceResult[]
}

interface AvaliationData {
    competences: Competence[],
    students: StudentAvaliationData[]
}

export interface IAvaliationTableProps {
    idTest?: number,
    name: string,
    date?: Date,
    data?: StudentsCompetences
}


export interface IStudentsCompetencesProps {
    
}