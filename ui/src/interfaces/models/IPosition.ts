import IEntity from "./IEntity";

export default interface IPosition extends IEntity {
    name?: string,
    positionLevel?: number | string
}