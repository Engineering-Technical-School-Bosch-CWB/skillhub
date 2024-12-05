import IEntity from "./IEntity";
import { IStudent } from "./IStudent";
import IUser from "./IUser";

export interface IFeedback extends IEntity
{
    instructorId:number,
    studentId:number,
    content: string,
    createdAt: Date,
    student?: IStudent,
    instructor?: IUser
}