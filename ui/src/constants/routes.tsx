import { ReactNode } from "react";
import AprenticesProfile from "../pages/AprenticesProfile";
import AprenticesResults from "../pages/AprenticesResults";
import AvaliateAprentices from "../pages/AvaliateAprentices";
import Birthdays from "../pages/Birthdays";
import ClassDetais from "../pages/ClassDetais";
import {CompleteRegistering} from "../pages/CompleteRegistering";
import ContentOverview from "../pages/ContentOverview";
import CreateAvaliation from "../pages/CreateAvaliation";
import CreateClass from "../pages/CreateClass";
import CurricularUnitOverview from "../pages/CurricularUnitOverview";
import Home from "../pages/Home";
import Login from "../pages/Login";

interface IAppRoute {
    path: string;
    element: ReactNode;
    title: string;
}

const routes:Record<string, IAppRoute> = {
    HOME: {
        path: "/",
        element: <Home/>,
        title: "Home" 
    },
    LOGIN: {
        path: "/login",
        element: <Login/>,
        title: "Login" 
    },
    CONTENT_OVERVIEW: {
        path: "/overview",
        element: <ContentOverview/>,
        title: "Content Overview" 
    },
    BIRTHDAYS: {
        path: "/birthdays",
        element: <Birthdays/>,
        title: "Birthdays" 
    },

    // ..aprentice directory
    APRENTICES_PROFILE: {
        path: "/aprentice/:id/profile",
        element: <AprenticesProfile/>,
        title: "Aprentices Profile" 
    },
    APRENTICES_RESULT: {
        path: "/aprentice/:id/results",
        element: <AprenticesResults/>,
        title: "Aprentices Results" 
    },

    // ..avaliation directory
    AVALIATE_APRENTICES: {
        path: "/avaliation/:id/avaliate",
        element: <AvaliateAprentices/>,
        title: "Avaliate Aprentices" 
    },
    CREATE_AVALIATION: {
        path: "/avaliation/create",
        element: <CreateAvaliation/>,
        title: "Create Avaliation" 
    },

    // ..class directory
    CLASS_DETAILS: {
        path: "/class/:id/details",
        element: <ClassDetais/>,
        title: "Class Detais" 
    },
    CLASSES_OVERVIEW: {
        path: "/class/overview",
        element: <AprenticesResults/>,
        title: "Aprentices Results" 
    },
    CREATE_CLASS: {
        path: "/class/create",
        element: <CreateClass/>,
        title: "Create Class" 
    },

    // ..user directory
    COMPLETE_REGISTERING: {
        // path: "/user/:id/register",
        path: "/user",
        element: <CompleteRegistering/>,
        title: "Complete Registering" 
    },
    USERS_OVERVIEW: {
        path: "/user/overview",
        element: <ContentOverview/>,
        title: "Content Overview" 
    },

    // ..subject directory
    SUBJECT_DETAILS: {
        path: "/subject/:id/details",
        element: <ContentOverview/>,
        title: "Content Overview" 
    },
    SUBJECT_RESULTS: {
        path: "/subject/:id/results",
        element: <ContentOverview/>,
        title: "Content Overview" 
    },

    // ..curricular unit directory
    CURRICULAR_UNIT_OVERVIEW: {
        path: "/curricular-unit/overview",
        element: <CurricularUnitOverview/>,
        title: "Curricular Unit Overview" 
    },
}

export default routes
