import IEntity from "./IEntity";
import IOccupationArea from "./IOccupationArea";
import IPosition from "./IPosition";
import ISector from "./ISector";
import IUserImage from "./IUserImage";

export default interface IUser extends IEntity {
    name?: string,
    identification?: string,
    birthday?: Date,
    image?: IUserImage,
    position?: IPosition,
    sector?: ISector, 
    occupationArea?: IOccupationArea
}