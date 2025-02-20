import { AccessLevel } from "../../enums/AccessLevel";
import CurricularUnitOverview from "../../pages/CurricularUnits/Pages/CurricularUnitOverview";
import { IAccessRoutes } from "../../interfaces/routes.interfaces";
import { RouteMap } from "../map";
import ClassesOverview from "../../pages/ClassesOverview";
import ClassDetails from "../../pages/ClassDetails";
import SubjectDetails from "../../pages/SubjectDetails";
import CreateClass from "../../pages/CreateClass";
import SchoolContent from "../../pages/SchoolContent";
import UsersOverview from "../../pages/UsersOverview";
import UserProfile from "@/pages/UserProfile";
import CreateExam from "@/pages/CreateExam";
import EvaluateExam from "../../pages/SubjectDetails/Pages/EvaluateExam";
import UsersProperties from "@/pages/UsersProperties";
import CurricularUnits from "@/pages/CurricularUnits";

export default {
    accessLevel: AccessLevel.TEACHER,
    routes: [
        {
            path: RouteMap.SCHOOL_CONTENT,
            title: "School Content",
            element: <SchoolContent/>,
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
        },
        {
            path: RouteMap.CREATE_EXAM,
            element: <CreateExam />
        },
        {
            path: RouteMap.USER_PROFILE,
            element: <UserProfile />
        },
        {
            path:RouteMap.USERS_PROPERTIES,
            element: <UsersProperties />

        },
        {
            path: RouteMap.EVALUATE_EXAM,
            element: <EvaluateExam />
        },
        {
            path: RouteMap.CURRICULAR_UNITS,
            element: <CurricularUnits />
        },
        {
            path: RouteMap.CURRICULAR_UNITY_BY_ID,
            element: <CurricularUnitOverview/>
        }
    ]
} as IAccessRoutes