import { AccessLevel } from "../../enums/AccessLevel";
import Birthdays from "../../pages/Birthdays";
import Home from "../../pages/Home";
import { IAccessRoutes } from "../../interfaces/routes.interfaces";
import { RouteMap } from "../map";

export default {
    accessLevel: AccessLevel.AUTHENTICATED,
    routes: [
        {
            path: RouteMap.HOME,
            element: <Home/>,
            title: "Home",
        },
        {
            path: RouteMap.BIRTHDAYS,
            element: <Birthdays/>,
            title: "Birthdays",
        },
    ]
} as IAccessRoutes