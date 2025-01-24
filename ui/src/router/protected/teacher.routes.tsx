import { AccessLevel } from "../../enums/AccessLevel";
import ContentOverview from "../../pages/ContentOverview";
import CurricularUnitOverview from "../../pages/CurricularUnitOverview";
import { IAccessRoutes } from "../../interfaces/routes.interfaces";
import { RouteMap } from "../map";
import ClassesOverview from "../../pages/ClassesOverview";
import ClassDetails from "../../pages/ClassDetails";
import SubjectDetails from "../../pages/SubjectDetails";
import NewTest from "../../pages/SubjectDetails/Pages/NewTest";
import AvaliationResult from "../../pages/SubjectDetails/Pages/AvaliationResult";
import AprenticesProfile from "../../pages/AprenticesProfile";

export default {
    accessLevel: AccessLevel.TEACHER,
    routes: [
        {
            path: RouteMap.SCHOOL_CONTENT,
            title: "School Content",
            element: <ContentOverview/>,
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
        // {
        //     path: RouteMap.SUBJECT_DETAILS,
        //     element: <SubjectDetails />,
        //     children: [
        //     ]
        // },
        // {
        //     path: RouteMap.NEW_SUBJECT_TEST,
        //     element: <NewTest />
        // },
        // {
        //     path: RouteMap.AVALIATION_RESULT,
        //     element: <AvaliationResult />
        // },
        // {
        //     path: RouteMap.STUDENT_OVERVIEW,
        //     element: <AprenticesProfile />
        // }
    ]
} as IAccessRoutes