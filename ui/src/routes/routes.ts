import { createBrowserRouter, RouteObject } from "react-router-dom"
import routes from "../constants/routes"

const routesDom:RouteObject[] = Object.values(routes).map(route => ({
    path: route.path,
    element: !route.children && route.element,
    children: []
}))

const router = createBrowserRouter(routesDom)

export default router