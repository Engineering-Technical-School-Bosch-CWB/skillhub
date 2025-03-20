import { ICourse } from "./ICourse";
import IEntity from "./IEntity";

export interface IClass extends IEntity
{
    name:string,
    idCourse:number,
    course?: ICourse,
    startingYear: number,
    abbreviation?: string,
    courseId: number
}