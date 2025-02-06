import { AptitudeEnum } from "@/enums/AptitudeEnum"

export interface IFeedbackData {
    id?: number
    content?: string
    updatedAt?: string
    instructor?: string
    student: {
        id: number
        userId: number
        name: string
        identification: string
        birthday?: string
    }
}

export interface IFeedback {
    feedback?: {
        id: number,
        content: string,
        updatedAt: string,
        instructor: string,
    }
    student: {
        id: number,
        userId: number
        name: string,
        identification: string,
        birthday?: string
    }
}

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
    exam: any
}


export interface IStudentsCompetencesProps {

}