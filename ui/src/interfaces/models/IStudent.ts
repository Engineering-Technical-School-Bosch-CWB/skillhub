import { IClass } from "./IClass";
import IEntity from "./IEntity";
import IUser from "./IUser";

export interface IStudent extends IEntity
{
    grade:number,
    userId: number,
    classId: number,
    personalFeedback?: string,
    user?: IUser,
    class?: IClass
}