import { EAptitude } from "../../enums/AptitudeEnum";
import { ICompetence } from "./ICompetence";
import IEntity from "./IEntity";
import IUser from "./IUser";

export interface IResult extends IEntity
{
    feedback: string,
    aptitude: EAptitude,
    studentId:number,
    competenceId:number,
    student: IUser,
    competence: ICompetence
}