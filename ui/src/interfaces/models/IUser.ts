import IEntity from "./IEntity";
import IImage from "./IImage";
import IOccupationArea from "./IOccupationArea";
import IPosition from "./IPosition";
import ISector from "./ISector";
import IUserImage from "./IUserImage";

export default interface IUser extends IEntity {
    name?: string,
    isArchived?: boolean,
    identification?: string,
    password?: string,
    birthday?: Date,
    image?: IUserImage,
    position?: IPosition,
    sector?: ISector, 
    occupationArea?: IOccupationArea,
    permissionLevel?: number,
    profilePicture?: IImage,
    studentProfile?: {
        id?: number,
        classId: number
    }
}

export class User implements IUser {
    
    constructor(data: IUser) {
        Object.assign(this, data)
    }

    static getDefault = (): IUser => {
        return new User({
            birthday: undefined,
            id: 0,
            identification: "",
            image: undefined,
            name: "",
            occupationArea: {
                id: 0, name: ""
            },
            permissionLevel: 0,
            position: {
                id: 0, name: ""
            },
            sector: {
                id: 0, name: ""
            }
        })
    }
}