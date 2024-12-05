import { IClass } from "./IClass";
import { ICurricularUnit } from "./ICurricularUnit";
import IEntity from "./IEntity";
import { ISpecificObjectives } from "./ISpecificObjectives";
import IUser from "./IUser";

export interface ISubject extends IEntity {
    instructorId: number,
    curricularUnitId: number,
    classId: number,
    
    name:string,
    period:number,
    duration: number,

    instructor?: IUser,
    curricularUnit?: ICurricularUnit,
    class?: IClass,

    objectives?: ISpecificObjectives[]
}