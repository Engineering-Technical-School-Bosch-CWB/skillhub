import { ISkillResult } from "../../../../../../../interfaces/models/ISkillResult"


export interface Student {
    name: string,
    userId: number,
    competences: ISkillResult[]
}

export interface StudentsCompetences {
    students: Student[]
}