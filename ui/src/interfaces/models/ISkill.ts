import { ICurricularUnit } from "./ICurricularUnit";
import IEntity from "./IEntity";

export interface ISkill extends IEntity {
    description: string,
    evaluationCriteria?: string,
    curricularUnitId: number,
    curricularUnit?: ICurricularUnit
}