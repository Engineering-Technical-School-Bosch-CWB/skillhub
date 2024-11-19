import { AccessLevel } from "../../enums/AccessLevel";
import ContentOverview from "../../pages/ContentOverview";
import CurricularUnitOverview from "../../pages/CurricularUnitOverview";
import { IAccessRoutes } from "../../interfaces/routes.interfaces";

export default {
    accessLevel: AccessLevel.TEACHER,
    routes: [
        {
            path: "/school-content",
            title: "School Content",
            element: <ContentOverview/>,
            children: [
                {
                    path: "curricular-unitys/:curricularUnityId",
                    element: <CurricularUnitOverview/>
                }
            ]
        }
    ]
} as IAccessRoutes