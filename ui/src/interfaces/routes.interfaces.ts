import { RouteObject } from "react-router-dom"
import { AccessLevel } from "../enums/AccessLevel"

export type IAppRoute = RouteObject & {
    title: string
}

export interface IAccessRoutes {
    accessLevel: AccessLevel
    routes: IAppRoute[]
}