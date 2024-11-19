import { RouteObject } from "react-router-dom"
import { IAccessRoutes } from "../../interfaces/routes.interfaces"
import authenticatedRoutes from "./authenticated.routes"
import teacherRoutes from "./teacher.routes"
import RouteProtection from "../../components/RouteProtection"

const routes: IAccessRoutes[] = [
    authenticatedRoutes,
    teacherRoutes
]

const protectedRoutes: RouteObject[] = routes.map(({ accessLevel, routes }) => ({
    path: "/",
    element: <RouteProtection accessLevel={accessLevel}/>,
    children: routes
}))

export default protectedRoutes
