import Login from "../../pages/Login";
import NotFound from "../../components/NotFound";
import { IAppRoute } from "../../interfaces/routes.interfaces";

export default [
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
] as IAppRoute[]