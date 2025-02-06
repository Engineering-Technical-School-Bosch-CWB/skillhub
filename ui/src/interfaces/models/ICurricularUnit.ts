import { IConvertToTable } from "../IConvert.interface";
import IEntity from "./IEntity";
import { ISubjectArea } from "./ISubjectArea";

export interface ICurricularUnit extends IEntity
{
    name:string,
    courseId: number,
    subjectAreaId: number,
    subjectArea: ISubjectArea,
}

export class CurricularUnit implements ICurricularUnit, IConvertToTable {
    name: string;
    courseId: number;
    subjectAreaId: number;
    subjectArea: ISubjectArea;
    id?: number | undefined;

    constructor(data: ICurricularUnit) {
        this.name = data.name;
        this.courseId = data.courseId;
        this.subjectAreaId = data.subjectAreaId;
        this.subjectArea = data.subjectArea;
        this.id = data.id;
    }

    convert = (): any => {
        return {
            name: this.name,
            id: this.id,
            subjectArea: this.subjectArea.name,
        }
    };

}