import IEntity from "./IEntity";
import { ISubject } from "./ISubject";

export interface ICompetence extends IEntity
{
    description: string,
    weight: number,
    subjectId:number,
    subject?: ISubject
}