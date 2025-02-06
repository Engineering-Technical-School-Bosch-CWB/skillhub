import { IConvertToTable } from "../IConvert.interface";
import IEntity from "./IEntity";

export interface ISubjectArea extends IEntity
{
    name: string,
    performance?: number | null
}

export class SubjectArea implements ISubjectArea, IConvertToTable {
    name: string;
    id?: number | undefined;
    performance?: number | null

    constructor(data: ISubjectArea) {
        this.name = data.name
        this.id = data.id
    }

    convert = (): any => {
        return {
            name: this.name,
            id: this.id
        };
    }

}