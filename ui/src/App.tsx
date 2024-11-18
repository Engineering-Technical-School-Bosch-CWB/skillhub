import { UserProvider } from "./contexts/userContext";
import "./styles/global.css"

import { RouterProvider } from "react-router-dom";
import router from "./routes/routes";
import { ToastContainer } from "react-toastify";


export default function App() {
    return (
        <UserProvider>
            <RouterProvider router={router}/>
            <ToastContainer position="top-center"/>
        </UserProvider>
    )
}
