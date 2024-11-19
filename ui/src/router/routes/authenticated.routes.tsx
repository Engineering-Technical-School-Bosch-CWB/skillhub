import { AccessLevel } from "../../enums/AccessLevel";
import Birthdays from "../../pages/Birthdays";
import Home from "../../pages/Home";
import { IAccessRoutes } from "../interfaces";

export default {
    accessLevel: AccessLevel.AUTHENTICATED,
    routes: [
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
    ]
} as IAccessRoutes