import { AccessLevel } from "../../enums/AccessLevel";
import CurricularUnitOverview from "../../pages/CurricularUnitOverview";
import { IAccessRoutes } from "../../interfaces/routes.interfaces";
import { RouteMap } from "../map";
import ClassesOverview from "../../pages/ClassesOverview";
import ClassDetails from "../../pages/ClassDetails";
import SubjectDetails from "../../pages/SubjectDetails";
import CreateClass from "../../pages/CreateClass";
import SchoolContent from "../../pages/SchoolContent";
import UsersOverview from "../../pages/UsersOverview";
import UserProfile from "@/pages/UserProfile";
import UsersProperties from "@/pages/UsersProperties";

export default {
    accessLevel: AccessLevel.TEACHER,
    routes: [
        {
            path: RouteMap.SCHOOL_CONTENT,
            title: "School Content",
            element: <SchoolContent/>,
            children: [
                {
                    path: RouteMap.CURRICULAR_UNITY_BY_ID,
                    element: <CurricularUnitOverview/>
                }
            ]
        },
        {
            path: RouteMap.CLASSES,
            title: "Classes",
            element: <ClassesOverview />,
        },
        {
            path: RouteMap.CLASS_DETAILS,
            element: <ClassDetails />
        },
        {
            path: RouteMap.NEW_CLASS,
            element: <CreateClass />
        },
        {
            path: RouteMap.USERS_OVERVIEW,
            element: <UsersOverview />
        },
        {
            path: RouteMap.SUBJECT_DETAILS,
            element: <SubjectDetails />,
            children: [
            ]
        },
        {
            path: RouteMap.USER_PROFILE,
            element: <UserProfile />
        },
        {
            path:RouteMap.USERS_PROPERTIES,
            element: <UsersProperties />

        },
        // {
        //     path: RouteMap.NEW_SUBJECT_TEST,
        //     element: <NewTest />
        // },
        // {
        //     path: RouteMap.AVALIATION_RESULT,
        //     element: <AvaliationResult />
        // },
    ]
} as IAccessRoutes