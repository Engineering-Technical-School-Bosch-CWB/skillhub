import IEntity from "./IEntity";

export enum EPositionLevel {
    Student,
    Admin
}

export default interface IPosition extends IEntity {
    name?: string,
    positionLevel?: EPositionLevel
}