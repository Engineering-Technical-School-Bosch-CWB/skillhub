import Header from "../../components/Header";

import {Tabs} from "./links"
import { useLocation } from "react-router-dom";
import Home from "./components/Home";
import CRUDComponent from "./components/CRUDComponent";
 

const useQuery = () => {
    return new URLSearchParams(useLocation().search);
}

const SchoolContent = () => {

    const query = useQuery();

    const renderTab = () => {
        const tab = query.get("tab")?.toString() as Tabs
        if(!tab)
            return <Home/>
        return <CRUDComponent kind={tab} /> 
    }

    return (
        <>
            <Header />
            <main>
                {renderTab()}
            </main>
        </>
    )
}

export default SchoolContent;