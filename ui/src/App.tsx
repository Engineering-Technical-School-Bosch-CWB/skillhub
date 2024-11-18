import { UserProvider } from "./contexts/userContext";
import "./styles/global.css"

//import { RouterProvider } from "react-router-dom";
//import router from "./routes/routes";
//! import { useTranslation } from "react-i18next";
//! import { useState } from "react";


//import Header from "./components/Header";
import { CompleteRegistering } from "./pages/CompleteRegistering";
import { Login } from "./pages/Login";

export default function App() {
    //! const {t} = useTranslation();
    //! const { t, i18n: {changeLanguage, language} } = useTranslation();

    //! const [currentLanguage, setCurrentLanguage] = useState(language);

    //! const handleChangeLanguage = () => {
    //!     const newLang = currentLanguage === "us" ? 'ptbr' : 'us';
    //!     changeLanguage(newLang);
    //!     setCurrentLanguage(newLang)
    //! }
    return (
        <UserProvider>
            {/* <RouterProvider router={router}/> */}
            {/* <h1>{t('login.welcome')}</h1>
            <button onClick={handleChangeLanguage}>click</button> */}
            {/* <RouterProvider router={router}/>
            <Header/> */}
            <CompleteRegistering/>
        </UserProvider>
    )
}
