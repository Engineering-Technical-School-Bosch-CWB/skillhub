import { createBrowserRouter } from "react-router-dom"
import protectedRoutes from "./protected"
import publicRoutes from "./public"

export const routes = [
    ...publicRoutes, 
    ...protectedRoutes
]

export const router = createBrowserRouter(routes, {basename:"/SkillHub/"})
