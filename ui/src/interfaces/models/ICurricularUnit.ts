import IEntity from "./IEntity";
import { ISubjectArea } from "./ISubjectArea";

export interface ICurricularUnit extends IEntity
{
    name:string,
    courseId: number,
    subjectAreaId: number,
    course: number,
    subjectArea: ISubjectArea,
}