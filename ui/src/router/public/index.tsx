import NotFound from "../../components/NotFound";
import { IAppRoute } from "../../interfaces/routes.interfaces";
import Login from "../../pages/Login";

const publicRoutes: IAppRoute[] = [
    {
        path: "*",
        element: <NotFound/>,
        title: "Not Found",
    },
    {
        path: "/",
        element: <Login/>,
        title: "Login",
    },
] 

export default publicRoutes
