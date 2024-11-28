import { AccessLevel } from "../../enums/AccessLevel";
import ContentOverview from "../../pages/ContentOverview";
import CurricularUnitOverview from "../../pages/CurricularUnitOverview";
import { IAccessRoutes } from "../../interfaces/routes.interfaces";
import { RouteMap } from "../map";
import ClassesOverview from "../../pages/ClassesOverview";

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
            children: [
                
            ]
        }
    ]
} as IAccessRoutes