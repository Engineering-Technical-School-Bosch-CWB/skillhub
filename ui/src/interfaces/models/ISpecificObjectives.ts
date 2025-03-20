import IEntity from "./IEntity";
import { ISubject } from "./ISubject";

export interface ISpecificObjectives extends IEntity
{
    identification: string,
    ressources: string,
    time: number,
    evaluationCriteria: string,
    subjectId:number
    subject?: ISubject
}