import IEntity from "./IEntity";
import IOccupationArea from "./IOccupationArea";

export interface ICourse extends IEntity
{
    name: string,
    abbreviation: string,
    occupationArea?: IOccupationArea
}