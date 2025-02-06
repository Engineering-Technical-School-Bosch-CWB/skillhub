import { IConvertToTable } from "../IConvert.interface";
import IEntity from "./IEntity";
import IOccupationArea from "./IOccupationArea";

export interface ICourse extends IEntity
{
    name: string,
    abbreviation: string,
    occupationAreaId?: number,
    occupationArea?: IOccupationArea
}

export class Course implements ICourse, IConvertToTable {
    name: string;
    abbreviation: string;
    occupationArea?: IOccupationArea | undefined;
    id?: number | undefined;

    constructor (data: ICourse) {
        this.name = data.name;
        this.abbreviation = data.abbreviation;
        this.occupationArea = data.occupationArea;
        this.id = data.id;
    }

    convert = () :any => {
        return {
            name: this.name,
            id: this.id,
            abbreviation: this.abbreviation,
            occupationArea: this.occupationArea?.name
        }
    } 

}