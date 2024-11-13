import { createBrowserRouter } from "react-router-dom";
import routes from "../constants/routes";

const router = createBrowserRouter([
    {
        path: routes.HOME.PATH,
        element: routes.HOME.ELEMENT
    },
    {
        path: routes.APRENTICES_PROFILE.PATH,
        element: routes.APRENTICES_PROFILE.ELEMENT
    },
    {
        path: routes.APRENTICES_RESULT.PATH,
        element: routes.APRENTICES_RESULT.ELEMENT
    },
    {
        path: routes.AVALIATE_APRENTICES.PATH,
        element: routes.AVALIATE_APRENTICES.ELEMENT
    },
    {
        path: routes.BIRTHDAYS.PATH,
        element: routes.BIRTHDAYS.ELEMENT
    },
    {
        path: routes.CLASSES_OVERVIEW.PATH,
        element: routes.CLASSES_OVERVIEW.ELEMENT
    },
    {
        path: routes.CLASS_DETAILS.PATH,
        element: routes.CLASS_DETAILS.ELEMENT
    },
    {
        path: routes.COMPLETE_REGISTERING.PATH,
        element: routes.COMPLETE_REGISTERING.ELEMENT
    },
    {
        path: routes.CONTENT_OVERVIEW.PATH,
        element: routes.CONTENT_OVERVIEW.ELEMENT
    },
    {
        path: routes.CREATE_AVALIATION.PATH,
        element: routes.CREATE_AVALIATION.ELEMENT
    },
    {
        path: routes.CREATE_CLASS.PATH,
        element: routes.CREATE_CLASS.ELEMENT
    },
    {
        path: routes.CURRICULAR_UNIT_OVERVIEW.PATH,
        element: routes.CURRICULAR_UNIT_OVERVIEW.ELEMENT
    },
    {
        path: routes.LOGIN.PATH,
        element: routes.LOGIN.ELEMENT
    },
    {
        path: routes.SUBJECT_DETAILS.PATH,
        element: routes.SUBJECT_DETAILS.ELEMENT
    },
    {
        path: routes.SUBJECT_RESULTS.PATH,
        element: routes.SUBJECT_RESULTS.ELEMENT
    },
    {
        path: routes.USERS_OVERVIEW.PATH,
        element: routes.USERS_OVERVIEW.ELEMENT
    },
])

export default router;