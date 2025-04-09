import { AccessLevel } from "../../enums/AccessLevel";
import Birthdays from "../../pages/Birthdays";
import Home from "../../pages/Home";
import { IAccessRoutes } from "../../interfaces/routes.interfaces";
import { RouteMap } from "../map";
import AprenticesResults from "../../pages/AprenticesResults";
import SubjectResults from "../../pages/SubjectResults";
import { CompleteRegistering } from "../../pages/CompleteRegistering";
import Calendar from "@/pages/Calendar";

export default {
    accessLevel: AccessLevel.AUTHENTICATED,
    routes: [
        {
            path: RouteMap.COMPLETE_REGISTERING,
            element: <CompleteRegistering />,
            title: "Complete Registering",
        },
        {
            path: RouteMap.HOME,
            element: <Home />,
            title: "Home",
        },
        {
            path: RouteMap.APPRENTICE_RESULTS,
            element: <AprenticesResults />,
            title: "Aprentices Results",
        },
        {
            path: RouteMap.SUBJECT_RESULTS,
            element: <SubjectResults />,
            title: "Subject Results",
        },
        {
            path: RouteMap.BIRTHDAYS,
            element: <Birthdays />,
            title: "Birthdays",
        },
        {
            path: RouteMap.CALENDAR,
            element: <Calendar />,
            title: "Calendar" 
        }
    ]
} as IAccessRoutes