import Birthdays from "../pages/Birthdays";
import Home from "../pages/Home";
import Login from "../pages/Login";
import ContentOverview from "../pages/ContentOverview";
import CurricularUnitOverview from "../pages/CurricularUnitOverview";
import { RouteObject } from "react-router-dom";
import { AccessLevel } from "../enums/AccessLevel";

type IAppRoute = {
    title: string
} & RouteObject

const routesByAccessLevel:Record<AccessLevel, IAppRoute[]> = {

    // Access Level: None
    0: [
        {
            path: "/login",
            element: <Login/>,
            title: "Login",
        },
    ],

    // Access Level: Authenticated
    1: [
        {
            path: "/",
            element: <Home/>,
            title: "Home",
        },
        {
            path: "/birthdays",
            element: <Birthdays/>,
            title: "Birthdays",
        },
    ],

    // Access Level: Teacher
    2: [
        {
            path: "/school-content",
            title: "School Content",
            element: <ContentOverview/>,
            children: [
                {
                    path: "curricular-unitys/:curricularUnityId",
                    element: <CurricularUnitOverview/>
                }
            ]
        }
    ],
}

export default routesByAccessLevel
