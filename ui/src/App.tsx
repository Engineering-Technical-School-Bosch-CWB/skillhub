import { UserProvider } from "./contexts/userContext";
import "./styles/global.css"

import { RouterProvider } from "react-router-dom";
import router from "./routes/routes";

import Header from "./components/Header";
import Modal from "./components/Modal";
import { useState } from "react";

export default function App() {

    const [open, setOpen] = useState(true)

    return (
        <UserProvider>
            {/* <RouterProvider router={router}/> */}
            <Header/>
            <Modal open={open} handleClose={() => setOpen(false)}></Modal>
        </UserProvider>
    )
}
