import { createBrowserRouter, RouteObject } from "react-router-dom"
import routes from "../constants/routes"

const routesDom:RouteObject[] = Object.values(routes)

const router = createBrowserRouter(routesDom)

export default router