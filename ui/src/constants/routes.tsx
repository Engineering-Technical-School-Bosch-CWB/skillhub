import AprenticesProfile from "../pages/AprenticesProfile";
import AprenticesResults from "../pages/AprenticesResults";
import AvaliateAprentices from "../pages/AvaliateAprentices";
import Birthdays from "../pages/Birthdays";
import ClassDetais from "../pages/ClassDetais";
import CompleteRegistering from "../pages/CompleteRegistering";
import ContentOverview from "../pages/ContentOverview";
import CreateAvaliation from "../pages/CreateAvaliation";
import CreateClass from "../pages/CreateClass";
import CurricularUnitOverview from "../pages/CurricularUnitOverview";
import Home from "../pages/Home";
import Login from "../pages/Login";

export default {
    HOME: {
        PATH: "/",
        ELEMENT: <Home/>
    },
    LOGIN: {
        PATH: "/login",
        ELEMENT: <Login/>
    },
    CONTENT_OVERVIEW: {
        PATH: "/overview",
        ELEMENT: <ContentOverview/>
    },
    BIRTHDAYS: {
        PATH: "/birthdays",
        ELEMENT: <Birthdays/>
    },

    // ..aprentice directory
    APRENTICES_PROFILE: {
        PATH: "/aprentice/:id/profile",
        ELEMENT: <AprenticesProfile/>
    },
    APRENTICES_RESULT: {
        PATH: "/aprentice/:id/results",
        ELEMENT: <AprenticesResults/>
    },

    // ..avaliation directory
    AVALIATE_APRENTICES: {
        PATH: "/avaliation/:id/avaliate",
        ELEMENT: <AvaliateAprentices/>
    },
    CREATE_AVALIATION: {
        PATH: "/avaliation/create",
        ELEMENT: <CreateAvaliation/>
    },

    // ..class directory
    CLASS_DETAILS: {
        PATH: "/class/:id/details",
        ELEMENT: <ClassDetais/>
    },
    CLASSES_OVERVIEW: {
        PATH: "/class/overview",
        ELEMENT: <AprenticesResults/>
    },
    CREATE_CLASS: {
        PATH: "/class/create",
        ELEMENT: <CreateClass/>
    },

    // ..user directory
    COMPLETE_REGISTERING: {
        PATH: "/user/:id/register",
        ELEMENT: <CompleteRegistering/>
    },
    USERS_OVERVIEW: {
        PATH: "/user/overview",
        ELEMENT: <ContentOverview/>
    },

    // ..subject directory
    SUBJECT_DETAILS: {
        PATH: "/subject/:id/details",
        ELEMENT: <ContentOverview/>
    },
    SUBJECT_RESULTS: {
        PATH: "/subject/:id/results",
        ELEMENT: <ContentOverview/>
    },

    // ..curricular unit directory
    CURRICULAR_UNIT_OVERVIEW: {
        PATH: "/curricular-unit/overview",
        ELEMENT: <CurricularUnitOverview/>
    },
}