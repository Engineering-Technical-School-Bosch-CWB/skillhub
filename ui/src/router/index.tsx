import { createBrowserRouter, RouteObject } from "react-router-dom"
import RouteProtection from "../components/RouteProtection"
import { IAccessRoutes } from "./interfaces"
import openRoutes from "./routes/open.routes"
import authenticatedRoutes from "./routes/authenticated.routes"
import teacherRoutes from "./routes/teacher.routes"

const routes: IAccessRoutes[] = [
    openRoutes,
    authenticatedRoutes,
    teacherRoutes
]

const protectedRoutes: RouteObject[] = routes.map(({ accessLevel, routes }) => ({
    path: "/",
    element: <RouteProtection accessLevel={accessLevel}/>,
    children: routes
}))

const router = createBrowserRouter(protectedRoutes)

export default router