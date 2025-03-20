import { EAptitude } from "@/enums/AptitudeEnum"

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

export interface IStudentResults {
    student: {
        id: number
        userId: number
        name: string
    }
    results: {
        skillId: number
        description: string
        weight: number
        aptitude?: EAptitude
    }[]
}

interface CompetenceResult {
    competenceId: number,
    aptitude: EAptitude
}

export interface StudentAvaliationData {
    name: string,
    competencesResult: CompetenceResult[]
}

export interface IAvaliationTableProps {
    exam: any
}

export interface IStudentSkillsProps {
    results: IStudentResults[]
    setResults: Function
}


export interface IStudentsCompetencesProps {

}

export interface IEvaluationPayload {
    studentId: number
    results : {
        skillId: number
        aptitude?: EAptitude
    }[]
}