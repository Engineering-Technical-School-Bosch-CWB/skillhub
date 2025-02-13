import { ICurricularUnit } from "./ICurricularUnit";
import IEntity from "./IEntity";

export interface ISubject extends IEntity {
    period?: number,
    durationHours?: number,
    beganAt?: string,
    instructorId?: number,
    instructorName?: string,
    curricularUnitId?: number,
    curricularUnit?: ICurricularUnit,
    classId?: number,
    class?: string,
    classStartingYear?: string
}