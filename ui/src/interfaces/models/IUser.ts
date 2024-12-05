import IEntity from "./IEntity";
import IOccupationArea from "./IOccupationArea";
import IPosition from "./IPosition";
import ISector from "./ISector";
import IUserImage from "./IUserImage";

export default interface IUser extends IEntity {
    name?: string,
    identification?: string,
    hash?: string,
    birthday?: Date,
    is_active?: boolean,
    image?: IUserImage,
    position?: IPosition,
    sector?: ISector, 
    occupation_area?: IOccupationArea
}