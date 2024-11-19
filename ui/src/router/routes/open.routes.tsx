import { AccessLevel } from "../../enums/AccessLevel";
import Login from "../../pages/Login";
import { IAccessRoutes } from "../../interfaces/routes.interfaces";

export default {
    accessLevel: AccessLevel.NONE,
    routes: [
        {
            path: "/login",
            element: <Login/>,
            title: "Login",
        },
    ]
} as IAccessRoutes