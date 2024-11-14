import { UserProvider } from "./contexts/userContext";
import "./styles/global.css"

import Home from "./pages/Home";

export default function App() {
    return (
        <UserProvider>
            {/* <RouterProvider router={router}/> */}
            <Home/>
        </UserProvider>
    )
}
