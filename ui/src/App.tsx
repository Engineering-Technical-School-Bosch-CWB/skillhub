import { UserProvider } from "./contexts/user.context";
import { router } from "./router";
import "./styles/global.css"

import { RouterProvider } from "react-router-dom";
import { ToastContainer } from "react-toastify";


export default function App() {
    return (
        <UserProvider>
            <RouterProvider router={router}/>
            <ToastContainer position="top-center"/>
        </UserProvider>
    )
}
