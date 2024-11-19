import { createBrowserRouter, RouteObject } from "react-router-dom"
import routesByAccessLevel from "../constants/routes"
import RouteProtection from "../components/RouteProtection"
import { AccessLevel } from "../enums/AccessLevel"

const routesDom:RouteObject[] = Object.keys(routesByAccessLevel).map(access => {
    const accessKey = Number(access) as AccessLevel

    return {
        path: "/",
        element: <RouteProtection accessLevel={accessKey}/>,
        children: routesByAccessLevel[accessKey]
    }
})

const router = createBrowserRouter(routesDom)

export default router