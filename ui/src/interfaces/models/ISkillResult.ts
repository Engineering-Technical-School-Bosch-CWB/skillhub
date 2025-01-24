import { AptitudeEnum } from "../../enums/AptitudeEnum";
import IEntity from "./IEntity";
import { IExam } from "./IExam";
import { ISkill } from "./ISkill";
import { ISubject } from "./ISubject";

export interface ISkillResult extends IEntity {

    aptitude?: AptitudeEnum,
    weight: number,
    evaluatedAt?: Date,
    studentId?: number,
    examId?: number,
    skillId?: number,
    subjectId?: number,
    objectionId?: number,
    exam?: IExam,
    skill?: ISkill,
    subject?: ISubject,
    objection?: number,
}