import { UserProvider } from "./contexts/userContext";
import "./styles/global.css"

import { RouterProvider } from "react-router-dom";
import router from "./routes/routes";

import Header from "./components/Header";

export default function App() {
    return (
        <UserProvider>
            <RouterProvider router={router}/>
            <Header/>
        </UserProvider>
    )
}
