import { AptitudeEnum } from "../../enums/AptitudeEnum";
import { ICompetence } from "./ICompetence";
import IEntity from "./IEntity";
import IUser from "./IUser";

export interface IResult extends IEntity
{
    feedback: string,
    aptitude: AptitudeEnum,
    studentId:number,
    competenceId:number,
    student: IUser,
    competence: ICompetence
}