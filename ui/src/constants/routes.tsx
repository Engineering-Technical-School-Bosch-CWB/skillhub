import Birthdays from "../pages/Birthdays";
import Home from "../pages/Home";
import Login from "../pages/Login";
import { AccessLevel } from "../enums/AccessLevel";
import ContentOverview from "../pages/ContentOverview";
import CurricularUnitOverview from "../pages/CurricularUnitOverview";
import { RouteObject } from "react-router-dom";

type IAppRoute = {
    title: string;
    accessLevel?: AccessLevel;
} & RouteObject

const routes:Record<string, IAppRoute> = {
    LOGIN: {
        path: "/login",
        element: <Login/>,
        title: "Login",
    },

    HOME: {
        path: "/",
        element: <Home/>,
        title: "Home",
        accessLevel: AccessLevel.AUTHENTICATED,
    },

    BIRTHDAYS: {
        path: "/birthdays",
        element: <Birthdays/>,
        title: "Birthdays",
        accessLevel: AccessLevel.AUTHENTICATED,
    },

    SCHOOL_CONTENT: {
        path: "/school-content",
        title: "School Content",
        accessLevel: AccessLevel.TEACHER,
        element: <ContentOverview/>,
        children: [
            {
                path: "curricular-unitys/:curricularUnityId",
                element: <CurricularUnitOverview/>
            }
        ]
    }
}

export default routes
