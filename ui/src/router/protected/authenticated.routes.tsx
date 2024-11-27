import { AccessLevel } from "../../enums/AccessLevel";
import Birthdays from "../../pages/Birthdays";
import Home from "../../pages/Home";
import { IAccessRoutes } from "../../interfaces/routes.interfaces";
import { RouteMap } from "../map";
import { CompleteRegistering } from "../../pages/CompleteRegistering";
import AprenticesResults from "../../pages/AprenticesResults";

export default {
    accessLevel: AccessLevel.AUTHENTICATED,
    routes: [
        {
            path: RouteMap.HOME,
            element: <Home/>,
            title: "Home",
        },
        {
            path: RouteMap.COMPLETE_REGISTERING,
            element: <CompleteRegistering/>,
            title: "Complete Registering",
        },
        {
            path: RouteMap.APRENTICES_RESULTS,
            element: <AprenticesResults/>,
            title: "Aprentices Results",
        },
        {
            path: RouteMap.BIRTHDAYS,
            element: <Birthdays/>,
            title: "Birthdays",
        },
    ]
} as IAccessRoutes