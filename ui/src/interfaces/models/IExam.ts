import IEntity from "./IEntity";
import { ISubject } from "./ISubject";
import IUser from "./IUser";

export interface IExam extends IEntity {
    name: string
    description: string
    appliedAt: Date
    instructorId: number
    subjectId: number
    instructor: IUser
    subject: ISubject
}