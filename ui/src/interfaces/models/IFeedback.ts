import IEntity from "./IEntity";
import { IStudent } from "./IStudent";

export interface IFeedback extends IEntity
{
    instructorId:number,
    studentId:number,
    content: string,
    updatedAt: string,
    student?: IStudent,
    instructor?: string
}