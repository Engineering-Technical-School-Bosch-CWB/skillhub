import { IConvertToTable } from "../IConvert.interface";
import IEntity from "./IEntity";

export default interface IOccupationArea extends IEntity {
    name?: string,
}

export class OccupationArea implements IOccupationArea, IConvertToTable {
    name?: string | undefined;
    id?: number | undefined;
    
    constructor(data: IOccupationArea) {
        this.name = data.name;
        this.id = data.id;
    }

    convert = ():any => {
        return {
            name: this.name,
            id: this.id,
        };
    }

}