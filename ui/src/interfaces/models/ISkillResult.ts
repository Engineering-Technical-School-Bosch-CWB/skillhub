import IEntity from "./IEntity";
import { ISubject } from "./ISubject";

export interface ISkillResult extends IEntity {

    aptitude: number,
    weight: number,
    evaluatedAt?: Date,
    studentId?: number,
    examId?: number,
    skillId?: number,
    subjectId?: number,
    objectionId?: number,
    exam?: number,
    skill?: number,
    subject?: ISubject,
    objection?: number,

}