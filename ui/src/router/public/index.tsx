import NotFound from "../../components/NotFound";
import { IAppRoute } from "../../interfaces/routes.interfaces";
import { Login } from "../../pages/Login";
import { RouteMap } from "../map";

const publicRoutes: IAppRoute[] = [
    {
        path: RouteMap.NOT_FOUND,
        element: <NotFound/>,
        title: "Not Found",
    },
    {
        path: RouteMap.LOGIN,
        element: <Login/>,
        title: "Login",
    },
] 

export default publicRoutes
